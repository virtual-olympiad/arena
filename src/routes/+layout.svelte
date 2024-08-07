<script lang="ts">
    import '../app.css';
    import { ModeWatcher, toggleMode } from 'mode-watcher';
    import { page } from '$app/stores';
    import { cn } from '$lib/utils';

    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import * as Sheet from '$lib/components/ui/sheet';

    import MobileNav from '$lib/components/mobileNav.svelte';

    import { GithubLogo, Sun, Moon } from 'svelte-radix';
    import { LoaderCircle } from 'lucide-svelte';

    import { Button } from '$lib/components/ui/button/index.js';
    import { Toaster } from '$lib/components/ui/sonner/index.js';
    import { toast } from 'svelte-sonner';

    import * as config from '$lib/siteConfig';
    import { socket } from '$lib/socket';

    import { goto, invalidate, invalidateAll } from '$app/navigation';
    import { onMount } from 'svelte';
    import { CircleUserRound, User } from 'lucide-svelte';

    export let data;

    let { supabase, session, user, profile } = data;
    $: ({ supabase, session, user, profile } = data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => data.subscription.unsubscribe();
    });

    let loadingSignOut = false;

    const signOut = async () => {
        if (loadingSignOut) {
            return;
        }

        loadingSignOut = true;

        await fetch('/api/auth/signout', {
            method: 'POST'
        });

        await goto('/', { invalidateAll: true });

        loadingSignOut = false;
    };

    socket.on('error', ({ error, message }) => {
        switch (error) {
            case 'authError':
                toast.error('Invalid User Authentication');
                break;
            case 'inputError':
                toast.warning('Invalid Input Data');
                break;
            case 'coreError':
                switch (message) {
                    case 'Cannot create room, user is already in a room.': case 'Cannot join room, user is already in a room.':
                        toast.error('You are already in a room.', {
                            description: 'Leave the room to create or join another room.'
                        });
                    break;
                    case 'Invalid room code.':
                        toast.error('Invalid room code');
                    break;
                    case 'Cannot join room, room is full.':
                        toast.error('Cannot join room, room is full.');
                    break;
                }
                break;
            case 'supabaseError':
            default:
                toast.error('Something went wrong.', {
                    description: 'Error: ' + message
                });
        }
    });

    socket.on('create-room:success', async () => {
        await goto('/live', { invalidateAll: true });
    });

    socket.on('join-room:success', async () => {
        await goto('/live', { invalidateAll: true });
    });

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
</script>

<svelte:head>
    <title>{config.site.name}</title>
    <meta property="keywords" content={config.site.keywords} />
    <meta property="description" content={config.site.description} />
    <meta property="author" content="polarity" />
    <meta property="og:site_name" content={config.site.site_name} />
    <meta property="og:title" content={config.site.name} />
    <meta property="og:url" content={config.site.url} />
    <meta property="og:description" content={config.site.description} />
    <meta property="og:image" content={config.site.ogImage} />
    <meta property="og:type" content="website" />
</svelte:head>

<ModeWatcher />
<Toaster richColors />
<header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
    <div class="container flex h-14 max-w-screen-2xl items-center">
        <div class="mr-4 hidden md:flex">
            <a href="/" class="mr-6 flex items-center space-x-2">
                <img src="/voa.png" alt="Virtual Olympiad Arena Logo" class="h-7 w-7" />
                <span class="hidden select-none font-bold tracking-tight sm:inline-block">
                    VOLY <span class="font-light">Arena</span>
                </span>
            </a>
            <nav class="flex items-center gap-6 text-sm">
                {#each config.nav as { title, href }}
                    <a
                        {href}
                        class={cn(
                            'transition-colors hover:text-foreground/80',
                            $page.url.pathname === href ? 'text-foreground' : 'text-foreground/60'
                        )}
                    >
                        {title}
                    </a>
                {/each}
            </nav>
        </div>

        <MobileNav />
        <div class="ml-auto flex items-center">
            <Button href={config.links.github} variant="ghost" size="sm">
                <GithubLogo class="h-4 w-4" />
                <span class="sr-only">Github</span>
            </Button>
            <Button on:click={toggleMode} variant="ghost" size="sm">
                <Sun
                    class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                    class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button
                        variant="ghost"
                        builders={[builder]}
                        class="relative ml-2 h-8 w-8 rounded-full"
                    >
                        <Avatar.Root class="h-8 w-8">
                            {#if loadingSignOut}
                                <LoaderCircle class="m-auto h-4 w-4 animate-spin" />
                            {:else}
                                <!--<Avatar.Image src={profile?.avatar_url} alt={"@" + profile?.username} />-->
                                <Avatar.Fallback>
                                    {profile?.display_name?.[0] ?? '?'}
                                </Avatar.Fallback>
                            {/if}
                        </Avatar.Root>
                    </Button>
                </DropdownMenu.Trigger>
                {#if profile}
                    <DropdownMenu.Content class="w-56" align="end">
                        <DropdownMenu.Label class="font-normal">
                            <div class="flex flex-col space-y-1">
                                <p class="text-sm font-medium leading-none">
                                    {profile.display_name}
                                </p>
                                <p class="text-xs leading-none text-muted-foreground">
                                    @{profile.username}
                                </p>
                            </div>
                        </DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Group>
                            <DropdownMenu.Item
                                target="_blank"
                                rel="noreferrer"
                                href={'https://volympiad.org/profile/@' + profile.username}
                            >
                                Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item href="/history">History</DropdownMenu.Item>
                            <DropdownMenu.Item
                                target="_blank"
                                rel="noreferrer"
                                href={'https://volympiad.org/settings'}
                            >
                                Settings
                            </DropdownMenu.Item>
                        </DropdownMenu.Group>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item on:click={signOut} disabled={loadingSignOut}>
                            {#if loadingSignOut}<LoaderCircle
                                    class="mr-2 h-4 w-4 animate-spin"
                                />{/if}
                            Sign Out
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                {:else}
                    <DropdownMenu.Content class="w-56" align="end">
                        <DropdownMenu.Item href="/signin">Sign In</DropdownMenu.Item>
                    </DropdownMenu.Content>
                {/if}
            </DropdownMenu.Root>
        </div>
    </div>
</header>

<main class="flex flex-col items-center" style="min-height: calc(100dvh - 3.5rem)">
    <slot />
</main>

<footer class="py-6 md:px-8 md:py-0">
    <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with &#9829; by
                <a
                    href={config.links.polarity}
                    target="_blank"
                    rel="noreferrer"
                    class="font-medium underline underline-offset-4"
                >
                    polarity
                </a>
                . The source code is available on
                <a
                    href={config.links.github}
                    target="_blank"
                    rel="noreferrer"
                    class="font-medium underline underline-offset-4"
                >
                    GitHub
                </a>
                .
            </p>
        </div>
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-right">
            &#169; 2021-present
        </p>
    </div>
</footer>
