<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
	import { slide } from 'svelte/transition';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import { WalletName } from '$lib/types';
	import { wallet, setWallet } from '$lib/composables/wallet.svelte';

	const wallets: WalletName[] = Object.values(WalletName);
	let isOpen = $state(false);

	function handleSelectWallet(wallet: WalletName) {
		setWallet(wallet);
	}
</script>

<div class="relative w-fit">
	<button class="flex cursor-pointer flex-row" onclick={() => (isOpen = !isOpen)}>
		{wallet.selected.name}
		<img alt={wallet.selected.name} src={wallet.selected.icon} width="24px" />
		<ArrowIcon direction={isOpen ? 'up' : 'down'} />
	</button>

	{#if isOpen}
		<ul transition:slide class="absolute flex w-auto flex-col">
			{#each wallets as name}
				<li
					class={`${wallet.selected.name === name ? 'bg-primary-500/30' : 'bg-primary-500/10'} 
                    flex cursor-pointer flex-row items-center border-b border-black/20 px-5 py-1 first:rounded-t-sm last:rounded-b-sm last:border-b-0`}
				>
					<button class="cursor-pointer" onclick={() => handleSelectWallet(name)}>
						{name}
					</button>

					<CheckIcon class={`${wallet.selected.name === name ? 'opacity-100' : 'opacity-0'}`} />
				</li>
			{/each}
		</ul>
	{/if}
</div>
