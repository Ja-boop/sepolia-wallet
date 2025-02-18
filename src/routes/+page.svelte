<script lang="ts">
	let isConnected = $state(false);

	function onClick() {
		isConnected = !isConnected;
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<button onclick={onClick}>{isConnected ? 'Disconnect' : 'Connect'}</button>
