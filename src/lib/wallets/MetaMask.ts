import metamaskIcon from '$lib/icons/metamask-icon.png';
import type { IWallet } from '$lib/interfaces/IWallet';
import { WalletName } from '$lib/types';
import { metaMask } from '@wagmi/connectors';

class MetaMask implements IWallet {
	public name = WalletName.MetaMask;
	public icon = metamaskIcon;
	public connector = metaMask();
}

export default MetaMask;
