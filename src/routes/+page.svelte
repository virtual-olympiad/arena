<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { Sword, Swords, BicepsFlexed, Zap, FlagTriangleRight } from 'lucide-svelte';

	import { capitalize } from "$lib/utils.js";

	import PublicRooms from './public-rooms.svelte';
	import PublicRoomsFilter from './public-rooms-filter.svelte';
	import { type ComponentType } from 'svelte';

	const modes: {
		value: roomMode | null;
		label: string;
		icon: ComponentType;
		description: string;
		disabled?: boolean;
	}[] = [
		{
			value: 'standard',
			label: 'Standard',
			icon: Sword,
			description: 'Solve a customizable problemset, free-for-all or in teams'
		},
		{
			value: 'guts',
			label: 'Guts',
			icon: BicepsFlexed,
			description: 'Solve several rounds of problems, no going back!'
		},
		{
			value: 'relay',
			label: 'Relay',
			icon: FlagTriangleRight,
			description: 'Solve a relay of problems with team members',
			disabled: true
		},
		{
			value: 'blitz',
			label: 'Blitz',
			icon: Zap,
			description: '???',
			disabled: true
		},
		{
			value: 'showdown',
			label: 'Showdown',
			icon: Swords,
			description: '???',
			disabled: true
		}
	];

	let selectedMode = 'standard'
	
    const changeMode = (mode: any) => {
        selectedMode = mode.value as roomMode;
    };

	let titleFilter = '';

	let otherFilters: PublicRoomOtherFilters = {
		notFull: false,
		mode: null
	};
</script>

<section class="w-full max-w-[1536px] p-4">
	<section
		class="mx-auto hidden max-w-[980px] flex-col items-center gap-2 py-8 text-center min-[320px]:flex md:py-12 md:pb-8 xl:pb-12"
	>
		<div class="flex items-center gap-2">
			<img src="/voa.png" alt="Virtual Olympiad Logo" class="h-12 w-12" />
			<h1 class="text-3xl font-bold leading-tight tracking-tighter lg:text-5xl lg:leading-[1.1]">
				VOLY <span class="font-thin">Arena</span>
			</h1>
		</div>
		<div class="flex max-w-[750px] items-center gap-2 text-balance text-sm text-muted-foreground">
			<div class="relative mr-1 grid place-items-center">
				<span class="absolute h-3 w-3 animate-pulse rounded-full bg-green-300" />
				<span class="absolute h-2 w-2 rounded-full bg-green-500" />
			</div>
			100 Players Online
			<div class="relative ml-4 mr-1 grid place-items-center">
				<span class="absolute h-3 w-3 animate-pulse rounded-full bg-blue-300" />
				<span class="absolute h-2 w-2 rounded-full bg-blue-500" />
			</div>
			28 Public Rooms
		</div>
	</section>
	<section class="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-2">
		<Tabs.Root value="create" class="w-full lg:ml-auto lg:max-w-lg">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="create">Create Room</Tabs.Trigger>
				<Tabs.Trigger value="join">Join Room</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="create">
				<Card.Root>
					<Card.Header>
						<Card.Title>Create a Room</Card.Title>
						<Card.Description>Practice and compete together.</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div class="space-y-1">
							<Label for="room-code">Room Title</Label>
							<Input id="room-code" type="text" placeholder="Enter a title..." />
						</div>
						<div class="space-y-1">
							<Label for="room-password">Room Description</Label>
							<Textarea
								class="resize-none"
								id="room-password"
								placeholder="Enter a description..."
							/>
						</div>
						<div class="space-y-1">
							<Label for="create-mode">Mode</Label>
							<Select.Root onSelectedChange={(v) => changeMode(v)}>
								<Select.Trigger id="create-mode" class="items-start [&_[data-description]]:hidden" let:builder>
									<Select.Value asChild placeholder="Select a game mode">
										{capitalize(selectedMode)}
									</Select.Value>
								</Select.Trigger>
								<Select.Content>
									{#each modes as { label, value, icon, description, disabled }}
										<Select.Item {value} {disabled}>
											<div class="flex items-start gap-3 text-muted-foreground">
												<svelte:component this={icon} class="size-5" />
												<div class="grid gap-0.5">
													<p class="text-foreground">
														{label}
													</p>
													<p class="text-xs" data-description>
														{description}
													</p>
												</div>
											</div>
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<p class="text-xs text-muted-foreground">
								You won't be able to change this afterwards.
							</p>
						</div>
						<div class="space-y-1">
							<Label for="visibility">Room Visibility</Label>
							<div class="flex items-center space-x-3">
								<p class="text-sm text-muted-foreground">Make Private</p>
								<Switch id="visibility" />
							</div>
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Create Room</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="join">
				<Card.Root>
					<Card.Header>
						<Card.Title>Join a Room</Card.Title>
						<Card.Description>Ask the room host for a code.</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div class="space-y-1">
							<Label for="room-code">Room Code</Label>
							<Input id="room-code" type="text" placeholder="Enter a code..." />
						</div>
						<div class="space-y-1">
							<Label for="room-password">Room Password</Label>
							<Input id="room-password" type="text" placeholder="For private rooms..." />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button>Join Room</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>

		<div class="lg:col-span-2 xl:col-span-1">
			<PublicRoomsFilter bind:titleFilter bind:otherFilters />
			<PublicRooms {titleFilter} {otherFilters} />
		</div>
	</section>
</section>
