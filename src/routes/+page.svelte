<script lang="ts">
	import { slide } from 'svelte/transition';
	import useEthereum from '$lib/composables/ethereum.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { truncateText } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import illustration from '$lib/assets/illustration.png';

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

<div
	class="relative mx-6 mt-40 flex flex-col items-center justify-center gap-24 lg:flex-row lg:gap-72"
>
	<div class="flex flex-col gap-3 self-start">
		<h1 class="text-3xl font-semibold lg:text-5xl">Check your balance</h1>
		<h2 class="text-xl font-normal lg:w-70 lg:text-3xl/11">
			Check your USDT balance for Sepolia network
		</h2>
	</div>

	<img
		class="absolute top-10 hidden lg:block"
		alt="illustration"
		src={illustration}
		width="300px"
	/>

	<div class="flex w-full flex-col gap-7 lg:h-80 lg:w-96">
		{#if account.address}
			<h3 transition:slide class="text-xl font-medium">Balance:</h3>

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
						class="absolute bottom-0 left-0 m-2 cursor-pointer"
						disabled={isLoading}
					>
						<RefreshIcon />
					</button>
				{/if}
			</div>
		{/if}

		<div class="relative w-full text-center">
			{#if account.address}
				<p class="bg-primary-500 rounded-lg py-4 text-white">
					{truncateText(account.address, 8)}
				</p>
			{:else}
				<Button onclick={useConnect} disabled={account.isConnected}>
					<p class="py-4 text-white">Connect your wallet</p>
				</Button>
			{/if}

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
