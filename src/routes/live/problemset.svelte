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
</script>

<Card.Root class="h-full">
    <Card.Header>
        <Card.Title>Problemset Settings</Card.Title>
        <Card.Description>Tweak the parameters of the auto-generated problemset.</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-2">
    </Card.Content>
    <Card.Footer>
        <Button>Update Settings</Button>
    </Card.Footer>
</Card.Root>