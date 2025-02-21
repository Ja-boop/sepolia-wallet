import { WalletName } from '$lib/types';
import getWallet from '$lib/wallets/WalletFactory';

const wallet = $state({
	selected: getWallet(WalletName.MetaMask)
});

function setWallet(walletName: WalletName) {
	wallet.selected = getWallet(walletName);
}

export { wallet, setWallet };
