<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import Dropdown from '$lib/components/Dropdown.svelte';

	const queryClient = new QueryClient();
	let { children } = $props();
</script>

<main>
	<QueryClientProvider client={queryClient}>
		<header class="p-2 lg:p-5">
			<Dropdown />
		</header>

		{@render children()}
	</QueryClientProvider>
</main>
