<script lang="ts">
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import { WalletName } from '$lib/types';
	import { wallet, setWallet } from '$lib/composables/wallet.svelte';
	import Dropdown from '../base/Dropdown.svelte';

	const wallets: WalletName[] = Object.values(WalletName);

	function handleSelectWallet(wallet: WalletName) {
		setWallet(wallet);
	}
</script>

<Dropdown label={wallet.selected.name}>
	{#snippet labelIcon()}
		<img alt={wallet.selected.name} src={wallet.selected.icon} width="24px" />
	{/snippet}

	{#snippet items()}
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
	{/snippet}
</Dropdown>
