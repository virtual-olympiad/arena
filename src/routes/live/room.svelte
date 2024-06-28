<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import { capitalize } from '$lib/utils.js';
	
	export let user, room;

	$: notHost = (user?.id != room?.info?.host);
</script>

<Card.Root class="h-full">
	<Card.Header>
		<Card.Title>Room Settings</Card.Title>
		<Card.Description>Configure room details.</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<div class="space-y-1">
			<Label for="room-code">Room Title</Label>
			<Input id="room-code" disabled={notHost} type="text" placeholder="Enter a title..." />
		</div>
        <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
                <Label for="room-code">Room Password</Label>
                <Input id="room-code" disabled={notHost} type="text" placeholder="Enter a title..." />
            </div>
            <div class="space-y-1">
                <Label for="room-code">Max Players</Label>
                <Input id="room-code" disabled={notHost} type="text" placeholder="Enter a title..." />
            </div>
        </div>
		<div class="space-y-1">
			<Label for="room-password">Room Description</Label>
			<Textarea class="resize-none" disabled={notHost} id="room-password" placeholder="Enter a description..." />
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
		<Button>Update Settings</Button>
	</Card.Footer>
</Card.Root>
