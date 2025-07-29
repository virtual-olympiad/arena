<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { toast } from "svelte-sonner";
	
	import { capitalize } from '$lib/utils.js';
    import type { SupabaseClient } from '@supabase/supabase-js';
    import { goto } from '$app/navigation';
	import {socket} from '$lib/socket';

	export let user, session, room: Room;

	$: notHost = (user?.id != room?.host);

	const handleUpdateRoom = async () => {
		if (notHost) {
			toast.error('You are not the host of this room.');
			return;
		}

		let { title, description } = room;
		
        if (title.length == 0 || title.length > 20) {
            toast.warning('Title must be between 1 and 20 characters.');
            return;
        }

        if (description.length > 200) {
            toast.warning('Description must be at most 200 characters.');
            return;
        }

		socket.emit('edit-settings-room', {
			token: session?.access_token,
			data: {
				title: title,
				description: description,
				max_players: room.max_players,
				private: room.private
			}
		});
	};
</script>

<Card.Root class="h-full">
	<Card.Header>
		<Card.Title>Room Settings</Card.Title>
		<Card.Description>Configure room details.</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="space-y-1">
			<Label for="room-code">Room Title</Label>
			<Input id="room-code" bind:value={room.title} disabled={notHost} type="text" placeholder="Enter a title..." />
		</div>
        <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
                <Label for="room-code">Room Password</Label>
                <Input id="room-code" disabled={notHost} type="text" placeholder="Enter a password..." />
            </div>
            <div class="space-y-1">
                <Label for="room-code">Max Players</Label>
                <Input id="room-code" bind:value={room.max_players} disabled={notHost} type="number" placeholder="Enter a number..." />
            </div>
        </div>
		<div class="space-y-1">
			<Label for="room-password">Room Description</Label>
			<Textarea class="resize-none" bind:value={room.description} disabled={notHost} id="room-password" placeholder="Enter a description..." />
		</div>
		<div class="space-y-1">
			<Label for="visibility">Room Visibility</Label>
			<div class="flex items-center space-x-3">
				<p class="text-sm text-muted-foreground">Make Private</p>
				<Switch disabled={notHost} bind:checked={room.private} id="visibility" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button disabled={notHost} on:click={handleUpdateRoom}>Update Settings</Button>
	</Card.Footer>
</Card.Root>
