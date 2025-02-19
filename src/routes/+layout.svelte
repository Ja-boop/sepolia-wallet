<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();
	let { children } = $props();
</script>

<main>
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</main>
