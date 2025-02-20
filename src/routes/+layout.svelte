<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import DropdownWallets from '$lib/components/wallets/DropdownWallets.svelte';

	const queryClient = new QueryClient();
	let { children } = $props();
</script>

<svelte:head>
	<title>USDT Balance - Sepolia</title>
</svelte:head>

<main>
	<QueryClientProvider client={queryClient}>
		<header class="p-2 lg:p-5">
			<DropdownWallets />
		</header>

		{@render children()}
	</QueryClientProvider>
</main>
