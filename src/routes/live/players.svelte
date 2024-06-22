<script lang="ts">
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import { BellRing, Ellipsis } from 'lucide-svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	
	export let id, host: string;

	console.log(id, host);

	const players: Player[] = [
		{
			uid: id,
			avatar_url: '/mango.v3@4x.png',
			display_name: 'Mango',
			username: 'polarity',
			statusText: 'Bing Chilling'
		},
		{
			uid: '1342',
			avatar_url: '/mango.v3@4x.png',
			display_name: 'FDSAFASDKLJFASDFJSDKALfdsklajfdklas',
			username: 'polarity',
			statusText: 'Bing Chilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
        {
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		},
		{
			uid: '12345',
			avatar_url: '',
			display_name: 'TheCelestialCube',
			username: 'as',
			statusText: 'Bing Cfasfashilling'
		}
	];
</script>

<div class="h-full">
	<ScrollArea class="h-full max-h-[400px] rounded-md border p-2 lg:max-h-[600px]">
		{#each players as { uid, avatar_url, display_name, username, statusText }}
			<div class="flex items-center space-x-4 rounded-md border p-4 px-2 sm:px-4">
				<Avatar.Root class="h-8 w-8">
					<Avatar.Image src={avatar_url} alt="@shadcn" />
					<Avatar.Fallback>{Array.from(display_name)[0].toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex-1 space-y-1">
					<HoverCard.Root>
						<HoverCard.Trigger
							href={`https://volympiad.org/profile/@${username}`}
							target="_blank"
							rel="noreferrer noopener"
							class="my-auto block w-fit max-w-[150px] overflow-hidden overflow-ellipsis rounded-sm text-sm hover:underline focus-visible:outline-2
                    focus-visible:outline-offset-8 focus-visible:outline-black min-[500px]:max-w-[200px]"
						>
							{display_name}
						</HoverCard.Trigger>
						<HoverCard.Content align="start">
							<div class="flex justify-between space-x-4">
								<Avatar.Root>
									<Avatar.Image src={avatar_url} alt="@shadcn" />
									<Avatar.Fallback>{Array.from(display_name)[0].toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<div class="space-y-1">
									<h4 class="text-sm font-semibold">@{username}</h4>
									<p class="text-sm">{statusText}</p>
									<div class="flex items-center pt-2">
										<CalendarDays class="mr-2 h-4 w-4 opacity-70" />
										<span class="text-xs text-muted-foreground"> Joined September 2022 </span>
									</div>
								</div>
							</div>
						</HoverCard.Content>
					</HoverCard.Root>
				</div>
				{#if uid === id}
					<div class="relative grid place-items-center">
						<span class="absolute h-3 w-3 animate-pulse rounded-full bg-blue-300" />
						<span class="absolute h-2 w-2 rounded-full bg-blue-500" />
					</div>
				{/if}
				{#if uid === host}
					<Badge variant="secondary" class="ml-2">Host</Badge>
				{/if}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
							<span class="sr-only">Open menu</span>
							<Ellipsis class="h-4 w-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="right">
						<DropdownMenu.Item>Copy Room Code</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/each}
	</ScrollArea>

	<div class="w-full mt-1 flex justify-end text-sm text-muted-foreground">
        Hosting {players.length}/16 player(s).
    </div>
</div>