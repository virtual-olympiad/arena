<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { socket } from "$lib/socket";

    let code = '', password = '';

    export let session;
    
    const handleJoinRoom = () => {
        socket.emit('join-room', {
            token: session?.access_token,
            data: {
                code,
                password
            }
        });
    };
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Join a Room</Card.Title>
        <Card.Description>Ask the room host for a code.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-2">
        <div class="space-y-1">
            <Label for="room-code">Room Code</Label>
            <Input id="room-code" bind:value={code} type="text" placeholder="Enter a code..." />
        </div>
        <div class="space-y-1">
            <Label for="room-password">Room Password</Label>
            <Input id="room-password" bind:value={password} type="text" placeholder="For private rooms..." />
        </div>
    </Card.Content>
    <Card.Footer>
        <Button on:click={handleJoinRoom}>Join Room</Button>
    </Card.Footer>
</Card.Root>