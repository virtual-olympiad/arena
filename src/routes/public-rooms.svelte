<script lang="ts">
	import { createTable, Render, createRender, Subscribe, DataBodyRow } from 'svelte-headless-table';
	import {
		addPagination,
		addTableFilter,
		addSortBy,
		addColumnFilters
	} from 'svelte-headless-table/plugins';

	import { readable, type Writable } from 'svelte/store';
	import { cn, capitalize } from '$lib/utils';

	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';

	import * as Table from '$lib/components/ui/table';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	import PublicRoomsActions from './public-rooms-actions.svelte';

	let data: PublicRoom[] = [
		{
			code: '1234',
			title: "Mango's Room",
			description: 'This is a lobby for AMC 8 practice. Beginners only.',
			mode: 'standard',
			players: [1, 2],
			maxPlayers: 2
		},
		{
			code: '5678',
			title: "Fellows' Room",
			description: 'This is a lobby for Putnam Fellows.',
			mode: 'guts',
			players: [],
			maxPlayers: 16
		}
	];

	data.sort((a, b) => {
		return b.players.length - a.players.length;
	});

	const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

	const table = createTable(readable(data), {
		page: addPagination({
			initialPageSize: 5
		}),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		colFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'title',
			header: 'Title',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'description',
			header: 'Description',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: ({ mode }) => capitalize(mode),
			header: 'Mode',
			plugins: {
				filter: {
					exclude: true
				},
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: ({ players, maxPlayers }) => {
				return players.length + '/' + maxPlayers;
			},
			header: 'Players',
			plugins: {
				filter: {
					exclude: true
				},
				sort: {
					compareFn: (left, right) => {
						return right.length - left.length;
					}
				}
			}
		}),
		table.column({
			accessor: ({ code, mode, players, maxPlayers }) => {
				return { code, mode, playerCount: players.length, maxPlayers };
			},
			header: '',
			cell: ({ value }) => {
				return createRender(PublicRoomsActions, {
					code: value.code
				});
			},
			plugins: {
				filter: {
					exclude: true
				},
				sort: {
					disable: true
				},
				colFilter: {
					fn: ({ filterValue, value }) => {
						return (
							(!filterValue.mode || value.mode == filterValue.mode) &&
							(!filterValue.notFull ||
								(filterValue.notFull && value.playerCount < value.maxPlayers))
						);
					}
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns, {
			rowDataId: (item, index) => {
				return item.code;
			}
		});

	let { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	let { filterValue: pluginTitleFilter } = pluginStates.filter;
	let { filterValues: pluginOtherFilters } = pluginStates.colFilter;

	export let titleFilter: string, otherFilters: PublicRoomOtherFilters;

	$: pluginTitleFilter.set(titleFilter);
	$: otherFilters &&
		pluginOtherFilters.set({
			'': otherFilters
		});
</script>

<div class="flex w-full flex-col">
	<div class="relative rounded-xl bg-muted/50 p-2">
		<div class="w-full overflow-auto rounded-md border bg-card">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										<Table.Head {...attrs}>
											{#if cell.id === 'Players'}
												<Button class="mx-auto" variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={'ml-2 h-4 w-4'} />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
											{#if cell.id === 'title'}
												<div
													class="line-clamp-2 max-w-[100px] overflow-hidden overflow-ellipsis text-left"
												>
													<Render of={cell.render()} />
												</div>
											{:else if cell.id === 'description'}
												<div
													class="line-clamp-2 max-w-[200px] overflow-hidden overflow-ellipsis text-left text-xs"
												>
													<Render of={cell.render()} />
												</div>
											{:else}
												<div class="text-left">
													<Render of={cell.render()} />
												</div>
											{/if}
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
	<div class="flex items-start justify-between space-x-4 py-4">
		<div class="text-sm text-muted-foreground">
			Showing {$rows.length}/{data.length} public room(s) online.
		</div>
		<div class="hidden items-center justify-end space-x-4 sm:flex">
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = Number($pageIndex) - 1)}
				disabled={!$hasPreviousPage}
			>
				Previous
			</Button>
			<Input
				type="number"
				placeholder="0"
				min={0}
				max={Math.ceil($rows.length / 5) - 1}
				bind:value={$pageIndex}
				class="h-9 w-[80px]"
			/>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = Number($pageIndex) + 1)}
			>
				Next
			</Button>
		</div>
		<div class="flex items-center justify-end space-x-2 sm:hidden">
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = Number($pageIndex) - 1)}
				disabled={!$hasPreviousPage}
				class="px-2"
			>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<Input
				type="number"
				placeholder="0"
				min={0}
				max={Math.ceil($rows.length / 5) - 1}
				bind:value={$pageIndex}
				class="h-9 min-w-[60px] max-w-[80px] p-2 pr-1"
			/>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = Number($pageIndex) + 1)}
				class="px-2"
			>
				<ChevronRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
