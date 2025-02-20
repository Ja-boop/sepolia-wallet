import type { WalletName } from '$lib/types';
import type { CreateConnectorFn } from '@wagmi/core';

interface IWallet {
	name: WalletName;
	icon: string;
	connector: CreateConnectorFn;
}

export type { IWallet };
