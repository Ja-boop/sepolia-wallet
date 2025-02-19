import { createConfig, http, getAccount, connect, disconnect } from '@wagmi/core';
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
	let address = $state(getAccount(config).address);

	async function useConnect() {
		await connect(config, { connector: metaMask() });
		address = getAccount(config).address;
	}

	async function useDisconnect() {
		await disconnect(config, { connector: getAccount(config).connector });
		address = undefined;
	}

	function useBalance() {
		return createQuery({
			...getBalanceQueryOptions(config, {
				address,
				token: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
			}),
			enabled: Boolean(address),
			retry: false
		});
	}

	return {
		get address() {
			return address;
		},
		useConnect,
		useDisconnect,
		useBalance
	};
}

export default useEthereum;
