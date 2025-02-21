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

function useEthereum() {
	let account = $state(getAccount(config));

	const unwatch = watchAccount(config, {
		onChange(data) {
			account = data;
		}
	});

	async function useConnect(connector: CreateConnectorFn) {
		await connect(config, { connector });
	}

	async function useDisconnect() {
		await disconnect(config, { connector: account.connector });
	}

	function useBalance() {
		return createQuery({
			...getBalanceQueryOptions(config, {
				address: account.address,
				token: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
			}),
			enabled: account.isConnected,
			retry: false
		});
	}

	return {
		get account() {
			return account;
		},
		useConnect,
		useDisconnect,
		useBalance,
		unwatch
	};
}

export default useEthereum;
