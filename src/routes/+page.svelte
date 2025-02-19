<script lang="ts">
	import { slide } from 'svelte/transition';
	import useEthereum from '$lib/composables/ethereum.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { truncateText } from '$lib/utils';
	import { onDestroy } from 'svelte';

	const { useConnect, useDisconnect, account, useBalance, unwatch } = $derived(useEthereum());
	const balance = $derived(useBalance());
	const isLoading = $derived(account.address && $balance.isPending);

	async function onClick() {
		if (account.address) {
			await useDisconnect();
		} else {
			await useConnect();
		}
	}

	onDestroy(() => {
		unwatch();
	});
</script>

<div class="mx-6 flex flex-col gap-24">
	<div class="flex flex-col gap-3">
		<h1 class="text-3xl font-semibold">Check your balance</h1>
		<h2 class="text-xl font-medium">Check your USDT balance for Sepolia network</h2>
	</div>

	<div class="flex flex-col gap-7">
		{#if account.address}
			<div
				transition:slide
				class="bg-primary-500/10 relative flex flex-col items-center justify-center rounded-lg"
			>
				<p class={`my-14 text-4xl font-semibold ${isLoading ? 'animate-pulse' : ''}`}>
					{#if isLoading || !account.address}
						0 USDT
					{/if}

					{#if $balance.error}
						Error!
					{/if}

					{#if $balance.isSuccess}
						{$balance.data.formatted} USDT
					{/if}
				</p>

				{#if $balance.error}
					<button
						transition:slide
						onclick={() => $balance.refetch()}
						class="absolute bottom-0 left-0 m-2"
						disabled={isLoading}
					>
						<RefreshIcon />
					</button>
				{/if}
			</div>
		{/if}

		<button
			onclick={onClick}
			class="bg-primary-500 flex flex-col items-center justify-center rounded-lg"
		>
			<p class={`my-4 truncate text-white`}>
				{account.address ? truncateText(account.address, 8) : 'Connect your wallet'}
			</p>
		</button>
	</div>
</div>
