<script lang="ts">
	import { slide } from 'svelte/transition';
	import useEthereum from '$lib/composables/ethereum.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { truncateText } from '$lib/utils';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/base/Button.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import illustration from '$lib/assets/illustration.png';
	import { wallet } from '$lib/composables/wallet.svelte';

	const { useConnect, useDisconnect, account, useBalance, unwatch } = $derived(useEthereum());
	const balance = $derived(useBalance());
	const isLoading = $derived(account.address && $balance.isPending);
	let isConnectError = $state(false);

	const connectButtonText = $derived.by(() => {
		if (isConnectError) {
			return 'There was an error, please try again';
		}

		if (account.address) {
			return truncateText(account.address, 8);
		}

		return 'Connect your wallet';
	});

	const balanceText = $derived.by(() => {
		if (isLoading) {
			return 'Loading...';
		}

		if ($balance.error) {
			return 'There was a problem, please try again';
		}

		if ($balance.isSuccess) {
			return `${$balance.data.formatted} USDT`;
		}
	});

	async function handleOnConnect() {
		isConnectError = false;

		try {
			await useConnect(wallet.selected.connector);
			isConnectError = false;
		} catch (error) {
			isConnectError = true;
		}
	}

	onDestroy(() => {
		unwatch();
	});
</script>

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
			<div transition:slide>
				<h3 class="text-xl font-medium">Balance:</h3>

				<div
					class="bg-primary-500/10 relative flex h-40 flex-col items-center justify-center rounded-lg px-5 py-14 text-center"
				>
					<p
						class={`${$balance.isError ? 'text-xl' : 'text-4xl'} font-semibold ${isLoading ? 'animate-pulse' : ''}`}
					>
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
			</div>
		{/if}

		<div class="relative w-full text-center">
			{#if account.address}
				<p class="bg-primary-500 rounded-lg py-4 text-white">
					{connectButtonText}
				</p>
			{:else}
				<Button onclick={handleOnConnect} disabled={account.isConnected}>
					<p class="py-4 text-white">{connectButtonText}</p>
				</Button>
			{/if}

			{#if account.address}
				<button
					onclick={useDisconnect}
					class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
				>
					<CloseIcon class="hover:fill-gray-300" />
				</button>
			{/if}
		</div>
	</div>
</div>
