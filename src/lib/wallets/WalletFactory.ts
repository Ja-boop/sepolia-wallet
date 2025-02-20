import { WalletName } from '$lib/types';
import MetaMask from './MetaMask';

function getWallet(name: WalletName) {
	switch (name) {
		case WalletName.MetaMask:
			return new MetaMask();
		default:
			return new MetaMask();
	}
}

export default getWallet;
