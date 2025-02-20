<script lang="ts">
	import { slide } from 'svelte/transition';
	import useEthereum from '$lib/composables/ethereum.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { truncateText } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';

	const { useConnect, useDisconnect, account, useBalance, unwatch } = $derived(useEthereum());
	const balance = $derived(useBalance());
	const isLoading = $derived(account.address && $balance.isPending);
	const balanceText = $derived.by(() => {
		if (isLoading) {
			return 'Loading...';
		}

		if ($balance.error) {
			return 'Error!';
		}

		if ($balance.isSuccess) {
			return `${$balance.data.formatted} USDT`;
		}
	});

	onDestroy(() => {
		unwatch();
	});
</script>

<svelte:head>
	<title>USDT Balance - Sepolia</title>
</svelte:head>

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
					{balanceText}
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

		<div class="relative w-full">
			<Button onclick={useConnect}>
				<p class="my-4 text-white">
					{account.address ? truncateText(account.address, 8) : 'Connect your wallet'}
				</p>
			</Button>

			{#if account.address}
				<button
					onclick={useDisconnect}
					class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
				>
					<CloseIcon />
				</button>
			{/if}
		</div>
	</div>
</div>
