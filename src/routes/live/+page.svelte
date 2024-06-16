<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, EllipsisVertical, Play, Trash2 } from 'lucide-svelte';

	import Players from './players.svelte';
	import RoomSettings from './room.svelte';
	import GameSettings from './game.svelte';
	import ProblemsetSettings from './problemset.svelte';

	import { type ComponentType } from 'svelte';

	import { Sword, Swords, BicepsFlexed, Zap, FlagTriangleRight } from 'lucide-svelte';

	const modes: {
		[key in roomMode]: {
			label: string;
			icon: ComponentType;
			description: string;
		}
	} = {
		'standard': {
			label: 'Standard',
			icon: Sword,
			description: 'Solve a customizable problemset, free-for-all or in teams'
		},
		'guts': {
			label: 'Guts',
			icon: BicepsFlexed,
			description: 'Solve several rounds of problems, no going back!'
		},
        'relay': {
			label: 'Relay',
			icon: FlagTriangleRight,
			description: 'Solve a relay of problems with team members'
		},
		'blitz': {
			label: 'Blitz',
			icon: Zap,
			description: '???'
		},
		'showdown':{
			label: 'Showdown',
			icon: Swords,
			description: '???'
		}
	};

	let mode: roomMode = 'standard';
</script>

<section class="w-full max-w-[1279px] space-y-4 p-2 sm:p-4 md:pb-8 lg:py-12 xl:pb-12">
	<div class="flex w-full items-center justify-start rounded-md border p-4 pr-2 sm:px-6 sm:pr-4">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<svelte:component this={modes[mode].icon} class="h-4 w-4 shrink sm:h-6 sm:w-6" />
			</Tooltip.Trigger>
			<Tooltip.Content>
				{modes[mode].label} Mode
			</Tooltip.Content>
		</Tooltip.Root>
		<div class="w-4 shrink"></div>
		<div class="mr-2 flex shrink-0 flex-col text-sm min-[500px]:flex-row lg:text-base">
			<span
				class="inline-block max-w-[140px] overflow-hidden overflow-ellipsis text-nowrap sm:max-w-[200px]"
			>
				Mango's Room
			</span>
			<span class="text-sm text-muted-foreground min-[500px]:ml-2 lg:text-base">
				<span class="select-none">#</span>1234
				<Badge class="ml-2 min-[500px]:hidden" variant="secondary">Public</Badge>
			</span>
		</div>
		<Badge class="mx-2 hidden min-[500px]:block" variant="secondary">Public</Badge>
		<div class="!ml-auto flex items-center space-x-2 md:space-x-4">
			<Button variant="outline" size="icon" class="hidden md:flex">
				<Trash2 class="h-4 w-4" />
			</Button>
			<Button variant="destructive" size="icon" class="h-8 w-8 p-0 md:hidden">
				<Trash2 class="h-4 w-4" />
			</Button>
			<Button class="hidden md:flex">
				Start Game
				<Play class="ml-2 h-4 w-4" />
			</Button>
			<Button size="icon" class="h-8 w-8 p-0 md:hidden">
				<Play class="h-4 w-4" />
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
						<span class="sr-only">Open menu</span>
						<EllipsisVertical class="h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content side="bottom" align="start">
					<DropdownMenu.Item>Copy Room Code</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<section class="grid grid-cols-1 gap-4 lg:h-max lg:grid-cols-2 xl:grid-cols-5">
		<Tabs.Root value="problemset" class="flex h-full w-full flex-col xl:col-span-3">
			<Tabs.List
				class="flex h-fit w-full flex-col justify-stretch min-[500px]:grid min-[500px]:grid-cols-3"
			>
				<Tabs.Trigger value="room">Room</Tabs.Trigger>
				<Tabs.Trigger value="game">Game</Tabs.Trigger>
				<Tabs.Trigger value="problemset">Problemset</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content class="lg:h-full" value="room">
				<RoomSettings />
			</Tabs.Content>
			<Tabs.Content class="lg:h-full" value="game">
				<GameSettings />
			</Tabs.Content>
			<Tabs.Content class="lg:h-full" value="problemset">
				<ProblemsetSettings />
			</Tabs.Content>
		</Tabs.Root>

		<div class="xl:col-span-2">
			<Players />
		</div>
	</section>
</section>
