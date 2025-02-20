import { createConfig, http, getAccount, connect, disconnect, watchAccount } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { metaMask } from '@wagmi/connectors';
import { getBalanceQueryOptions } from '@wagmi/core/query';
import { createQuery } from '@tanstack/svelte-query';
import { PUBLIC_USDT_CONTRACT_ADDRESS } from '$env/static/public';

const config = createConfig({
	chains: [sepolia],
	connectors: [metaMask()],
	transports: {
		[sepolia.id]: http()
	}
});

function useEthereum() {
	let account = $state(getAccount(config));

	const unwatch = watchAccount(config, {
		onChange(data) {
			account = data;
		}
	});

	async function useConnect() {
		await connect(config, { connector: metaMask() });
		account = getAccount(config);
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
