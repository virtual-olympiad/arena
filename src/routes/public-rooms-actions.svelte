<script lang="ts">
	import { Ellipsis, Play } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
    import { socket } from "$lib/socket";

	export let code: string, session;
	const handleJoinRoom = () => {
		console.log(code);
        socket.emit('join-room', {
            token: session?.access_token,
            data: {
                code
            }
        });
    };
</script>

<Button on:click={handleJoinRoom} variant="ghost" size="icon" class="relative h-8 w-8 p-0">
    <span class="sr-only">Join room</span>
    <Play class="h-4 w-4" />
</Button>

<!--
<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content side="right">
		<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(code)}>Copy Room Code</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
-->