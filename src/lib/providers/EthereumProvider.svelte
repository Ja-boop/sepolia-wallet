<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createOnReconnectMutation } from '$lib/stores/ethereum.svelte';
	import { wallet } from '$lib/stores/wallet.svelte';
	import { onMount } from 'svelte';

	const reconnectMutation = createOnReconnectMutation();
	const { children }: { children: Snippet } = $props();

	onMount(() => {
		$reconnectMutation.mutate({ connectors: [wallet.selected.connector] });
	});
</script>

{@render children()}
