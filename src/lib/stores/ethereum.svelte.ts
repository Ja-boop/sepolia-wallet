import {
	createConfig,
	http,
	getAccount,
	connect,
	disconnect,
	watchAccount,
	type CreateConnectorFn
} from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { metaMask } from '@wagmi/connectors';
import { getBalanceQueryOptions } from '@wagmi/core/query';
import { createQuery } from '@tanstack/svelte-query';
import { PUBLIC_SEPOLIA_URL, PUBLIC_USDT_CONTRACT_ADDRESS } from '$env/static/public';

const config = createConfig({
	chains: [sepolia],
	connectors: [metaMask()],
	transports: {
		[sepolia.id]: http(PUBLIC_SEPOLIA_URL || undefined)
	}
});

const ethereumStore = $state({
	account: getAccount(config)
});

const unwatch = watchAccount(config, {
	onChange(data) {
		ethereumStore.account = data;
	}
});

async function useConnect(connector: CreateConnectorFn) {
	await connect(config, { connector });
}

async function useDisconnect() {
	await disconnect(config, { connector: ethereumStore.account.connector });
}

function useBalance() {
	return createQuery({
		...getBalanceQueryOptions(config, {
			address: ethereumStore.account.address,
			token: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
		}),
		enabled: ethereumStore.account.isConnected,
		retry: false
	});
}

export { useBalance, useConnect, useDisconnect, unwatch, ethereumStore };
