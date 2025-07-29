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
    import { Check } from 'lucide-svelte';
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import { socket } from '$lib/socket';
    import { toast } from 'svelte-sonner';

    const sources = [
        {
            id: 'amc8',
            name: 'AMC 8',
            difficulty: '1 - 1.5',
            description: 'Multiple choice problems for middle schoolers',
            color: 'bg-green-600',
            available: true,
        },
        {
            id: 'amc10',
            name: 'AMC 10',
            difficulty: '1 - 3',
            description: 'Hard multiple choice problems for 9th and 10th graders',
            color: 'bg-purple-600',
            available: true
        },
        {
            id: 'amc12',
            name: 'AMC 12',
            difficulty: '2 - 4',
            description: 'Harder multiple choice problems for 11th and 12th graders',
            color: 'bg-red-700',
            available: true
        },
        {
            id: 'aime',
            name: 'AIME',
            difficulty: '3 - 6',
            description: 'Challenging answer based problems for high schoolers',
            color: 'bg-red-800',
            available: true
        },
        {
            id: 'mo',
            name: 'MO',
            difficulty: '',
            description: 'Extremely challenging proof based olympiads',
            color: 'bg-gray-900',
            available: false
        }
    ];

    let sourceSettings: Record<string, SourceSettings> = {
        amc8: {
            problemCount: 0,
            correctValue: 6,
            incorrectValue: 0,
            blankValue: 1.5,
            selected: false
        },
        amc10: {
            problemCount: 0,
            correctValue: 6,
            incorrectValue: 0,
            blankValue: 1.5,
            selected: false
        },
        amc12: {
            problemCount: 0,
            correctValue: 6,
            incorrectValue: 0,
            blankValue: 1.5,
            selected: false
        },
        aime: {
            problemCount: 0,
            correctValue: 10,
            incorrectValue: 0,
            blankValue: 0,
            selected: false
        },
        mo: {
            problemCount: 0,
            correctValue: 0,
            incorrectValue: 0,
            blankValue: 0,
            selected: false
        }
    };

    export let session, notHost, room;

    $: sourceSettings = room.settings_problemset;

	const updateSelections = (id: string) => {
        if (notHost) return;
		sourceSettings[id].selected = !sourceSettings[id].selected;
	};

	updateSelections('amc8');

    const handleUpdateProblemset = () => {
        let totalProblems = 0;
        for (let id in sourceSettings){
            let source = sourceSettings[id];
            if (!source.selected) continue;

            totalProblems += source.problemCount;
        }

        if (totalProblems <= 0){
            toast.error('You must select at least one problem from a source.');
            return;
        }

        socket.emit('edit-settings-problemset', {
            token: session?.access_token,
            data: sourceSettings
        });
    };
</script>

<Card.Root class="h-full">
    <Card.Header>
        <Card.Title>Problemset Settings</Card.Title>
        <Card.Description>Tweak the parameters of the auto-generated problemset.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-2 text-sm sm:text-base max-h-[80vh] lg:max-h-[60vh] overflow-y-auto">
        <Label for="problemset-sources">Sources</Label>
        <div class="space-y-1">
			{#each sources as { id, name, difficulty, description, color, available }}
				<Card.Root class={(sourceSettings[id].selected ? "bg-accent text-accent-foreground ring-1 " : "") + (notHost ? "":"cursor-pointer ") + "relative p-3 transition-colors hover:bg-accent hover:text-accent-foreground"}>
					{#if sourceSettings[id].selected}
						<span class="absolute right-2 top-2 p-2">
							<Check class="h-4 w-4" />
						</span>
					{/if}
					<button
						type="button"
						class={"flex items-start justify-between w-full text-left focus:outline-none " + (available ? "" : "opacity-50 cursor-not-allowed ") + (notHost ? "cursor-not-allowed " : "")}
						on:click={() => available && updateSelections(id)}
						on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateSelections(id); } }}
						role="option"
						aria-selected={sourceSettings[id].selected}
						tabindex="0"
					>
						<div class="flex-1 space-y-1">
							<div class="flex items-center gap-3">
								<h4 class="font-semibold">{name}</h4>
								<Badge class={"text-white " + color}>
									{available ? "Difficulty: " + difficulty : "Coming Soon"}
								</Badge>
							</div>
							<p class="text-sm">{description}</p>
						</div>
					</button>
					
					{#if sourceSettings[id].selected}
						<Collapsible.Root open={true}>
							<Collapsible.Trigger class="mt-2 text-xs text-primary underline underline-offset-2">
								Configurate
							</Collapsible.Trigger>
							<Collapsible.Content>
								<div class="p-2 bg-muted rounded-md">
									<div class="grid grid-cols-2 gap-2">
										<div>
											<Label for="{id}-problemCount">Problem Count</Label>
											<Input disabled={notHost} id="{id}-problemCount" type="number" min="0" max="100" bind:value={sourceSettings[id].problemCount} />
										</div>
										<div>
											<Label for="{id}-correctvalue">Correct Value</Label>
											<Input disabled={notHost} id="{id}-correctvalue" type="number" step="any" bind:value={sourceSettings[id].correctValue} />
										</div>
										<div>
											<Label for="{id}-incorrectvalue">Incorrect Value</Label>
											<Input disabled={notHost} id="{id}-incorrectvalue" type="number" step="any" bind:value={sourceSettings[id].incorrectValue} />
										</div>
										<div>
											<Label for="{id}-blankvalue">Blank Value</Label>
											<Input disabled={notHost} id="{id}-blankvalue" type="number" step="any" bind:value={sourceSettings[id].blankValue} />
										</div>
									</div>
								</div>
							</Collapsible.Content>
						</Collapsible.Root>
					{/if}
				</Card.Root>
			{/each}
        </div>
    </Card.Content>
    <Card.Footer>
        <Button on:click={handleUpdateProblemset} class="mt-2">Update Problemset</Button>
    </Card.Footer>
</Card.Root>
