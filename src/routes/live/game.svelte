<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { capitalize } from '$lib/utils.js';

	import { type ComponentType } from 'svelte';

	import { Sword, Swords, BicepsFlexed, Zap, FlagTriangleRight } from 'lucide-svelte';

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

	export let selectedMode;
</script>

<Card.Root class="h-full">
	<Card.Header>
		<Card.Title>Game Settings</Card.Title>
		<Card.Description>Choose what happens in-game.</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
        <div class="space-y-1">
            <Label for="create-mode">Mode</Label>
            <Select.Root>
                <Select.Trigger
                    id="create-mode"
                    class="items-start [&_[data-description]]:hidden"
					disabled
                    let:builder
                >
                    <Select.Value asChild placeholder="Select a game mode">
                        {capitalize(selectedMode)}
                    </Select.Value>
                </Select.Trigger>
                <Select.Content>
                    {#each modes as { label, value, icon, description, disabled }}
                        <Select.Item {value}>
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
        </div>
	</Card.Content>
	<Card.Footer>
		<Button>Update Settings</Button>
	</Card.Footer>
</Card.Root>