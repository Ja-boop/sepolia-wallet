<script lang="ts">
	import useEthereum from '$lib/composables/ethereum.svelte';

	const { useConnect, useDisconnect, address, useBalance } = $derived(useEthereum());
	const balance = $derived(useBalance());

	async function onClick() {
		if (address) {
			await useDisconnect();
		} else {
			await useConnect();
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>Address: {address}</p>

<button onclick={onClick}>{address ? 'Disconnect' : 'Connect'}</button>

{#if address}
	<div>
		{#if $balance.isPending}
			Loading...
		{/if}
		{#if $balance.error}
			An error has occurred:
			{$balance.error.message}
		{/if}
		{#if $balance.isSuccess}
			<div>
				<strong>👀 {$balance.data.formatted}</strong>{' '}
			</div>
		{/if}
	</div>
{/if}
