<script lang="ts">
	import { Input } from '$lib/components/ui/input';
    import { Switch } from "$lib/components/ui/switch/index.js";
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import {
		Search,
		Check,
		ChevronsUpDown,
		CalendarIcon,
		SquareRadical,
		LoaderCircle
	} from 'lucide-svelte';

	import { cn } from '$lib/utils.js';

	const modes: {
        value: roomMode | null;
        label: string;
    }[] = [
        {
            value: null,
            label: 'All Modes'
        },
		{
			value: 'standard',
			label: 'Standard'
		},
		{
			value: 'guts',
			label: 'Guts'
		}
	];

    const changeMode = (mode: any) => {
        otherFilters.mode = mode.value as roomMode;
    };

	export let titleFilter: string, otherFilters: PublicRoomOtherFilters;
</script>

<form class="mb-4 grid items-start gap-6">
	<fieldset class="flex flex-col gap-3 rounded-lg border p-4 lg:grid">
		<div class="grid gap-3">
            <Label for="title">Search Public Rooms</Label>
            <Input
                id="title"
                placeholder="Search title or description..."
                type="text"
                bind:value={titleFilter}
            />
        </div>
		<div class="flex flex-col gap-4 lg:grid lg:grid-cols-2">
			<div class="flex flex-col gap-3">
                <Label for="mode">Filter Mode</Label>
                <Select.Root onSelectedChange={(v) => changeMode(v)}>
                    <Select.Trigger id="mode" class="items-start [&_[data-description]]:hidden">
                        <Select.Value placeholder="Select a game mode" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each modes as { label, value }}
                            <Select.Item {value}>{label}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
            <div class="flex flex-col gap-3">
                <Label for="not-full">Filter Players</Label>
                <div class="flex items-center space-x-3 h-10">
                    <p class="text-sm text-muted-foreground">Don't show full rooms</p>
                    <Switch id="not-full" bind:checked={otherFilters.notFull} />
                </div>
            </div>
		</div>
	</fieldset>
</form>
