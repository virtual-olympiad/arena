<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import * as Select from '$lib/components/ui/select';
    import { Switch } from '$lib/components/ui/switch';
    import { Textarea } from '$lib/components/ui/textarea';
    import { socket } from '$lib/socket';
    import { capitalize } from '$lib/utils';
    import { Sword, Swords, BicepsFlexed, Zap, FlagTriangleRight } from 'lucide-svelte';
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
            description: 'Solve several rounds of problems, no going back!',
            disabled: true
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

    let selectedMode = 'standard';

    const changeMode = (mode: any) => {
        selectedMode = mode.value as roomMode;
    };

    let title = '',
        description = '',
        isPrivate = false;

    export let session;

    import { toast } from 'svelte-sonner';

    const handleCreateRoom = () => {
        if (title.length == 0 || title.length > 20) {
            toast.warning('Title must be between 1 and 20 characters.');
            return;
        }

        if (description.length > 200) {
            toast.warning('Description must be at most 200 characters.');
            return;
        }

        socket.emit('create-room', {
            token: session?.access_token,
            data: {
                title,
                description,
                mode: selectedMode,
                isPrivate
            }
        });
    };
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Create a Room</Card.Title>
        <Card.Description>Practice and compete together.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-2">
        <div class="space-y-1">
            <Label for="room-title">Room Title</Label>
            <Input id="room-title" bind:value={title} type="text" maxlength={20} placeholder="Enter a title..." />
        </div>
        <div class="space-y-1">
            <Label for="room-description">Room Description</Label>
            <Textarea class="resize-none" bind:value={description} id="room-description" maxlength={200} placeholder="Enter a description..." />
        </div>
        <div class="space-y-1">
            <Label for="room-mode">Mode</Label>
            <Select.Root onSelectedChange={(v) => changeMode(v)}>
                <Select.Trigger
                    id="room-mode"
                    class="items-start [&_[data-description]]:hidden"
                    let:builder
                >
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
            <Label for="room-visibility">Room Visibility</Label>
            <div class="flex items-center space-x-3">
                <p class="text-sm text-muted-foreground">Make Private</p>
                <Switch id="room-visibility" bind:checked={isPrivate} />
            </div>
        </div>
    </Card.Content>
    <Card.Footer>
        <Button on:click={handleCreateRoom}>Create Room</Button>
    </Card.Footer>
</Card.Root>
