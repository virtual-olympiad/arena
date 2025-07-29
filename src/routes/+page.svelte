<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Alert from "$lib/components/ui/alert";

	import PublicRooms from './public-rooms.svelte';
	import PublicRoomsFilter from './public-rooms-filter.svelte';
    import CreateRoom from './create-room.svelte';
    import JoinRoom from './join-room.svelte';
    import { socket } from '$lib/socket';
    import { CircleAlert } from 'lucide-svelte';
    import Button from '$lib/components/ui/button/button.svelte';
	import { goto, invalidateAll } from '$app/navigation';
    import { onMount } from 'svelte';

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.searchParams.get('login') === 'success') {
			invalidateAll();
		}
	});
	
	export let data;
	
    let { rooms, supabase, session, game } = data;
    $: ({ rooms, supabase, session, game } = data);

	let onlinePlayers = 0;

	/**
	 * $: onlinePlayers = rooms.reduce((curr, val)=> {
		return curr + (val.players?.length ?? 0)
	}, 0);
	**/

	let titleFilter = '';

	let otherFilters: PublicRoomOtherFilters = {
		notFull: false,
		mode: null
	};

	onMount(() => {
		socket.emit('player-count');
	})

    socket.on('player-count:update', ({value}) => {
		onlinePlayers = value;
	});
</script>

<section class="w-full max-w-[1536px] p-4">
	{#if game}
		<Alert.Root class="flex w-full">
			<CircleAlert class="h-4 w-4" />
			<span>
				<Alert.Title>Live Game</Alert.Title>
				<Alert.Description>
					You are currently in a game room.
				</Alert.Description>
			</span>
			<Button class="ml-auto" href="/live">
				Return to Room
			</Button>
		</Alert.Root>
	{/if}
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
			{ onlinePlayers ?? 0 } Players Online
			<div class="relative ml-4 mr-1 grid place-items-center">
				<span class="absolute h-3 w-3 animate-pulse rounded-full bg-blue-300" />
				<span class="absolute h-2 w-2 rounded-full bg-blue-500" />
			</div>
			{ rooms?.length ?? 0 } Public Rooms
		</div>
	</section>
	<section class="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-2">
		<Tabs.Root value="create" class="w-full lg:ml-auto lg:max-w-lg">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="create">Create Room</Tabs.Trigger>
				<Tabs.Trigger value="join">Join Room</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="create">
				<CreateRoom {session} />
			</Tabs.Content>
			<Tabs.Content value="join">
				<JoinRoom {session} />
			</Tabs.Content>
		</Tabs.Root>

		<div class="lg:col-span-2 xl:col-span-1">
			<PublicRoomsFilter bind:titleFilter bind:otherFilters />
			<PublicRooms {rooms} {session} {supabase} {titleFilter} {otherFilters} {game} />
		</div>
	</section>
</section>