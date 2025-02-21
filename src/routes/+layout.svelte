<script lang="ts">
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import DropdownWallets from '$lib/components/wallets/DropdownWallets.svelte';
	import EthereumProvider from '$lib/providers/EthereumProvider.svelte';

	const queryClient = new QueryClient();
	let { children } = $props();
</script>

<svelte:head>
	<title>USDT Balance - Sepolia</title>
</svelte:head>

<main>
	<QueryClientProvider client={queryClient}>
		<EthereumProvider>
			<header class="p-2 lg:p-5">
				<DropdownWallets />
			</header>

			{@render children()}
		</EthereumProvider>
	</QueryClientProvider>
</main>
