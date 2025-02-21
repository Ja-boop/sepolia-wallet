import {
	createConfig,
	http,
	getAccount,
	watchAccount,
	watchConnections,
	type Connection
} from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { metaMask } from '@wagmi/connectors';
import {
	connectMutationOptions,
	disconnectMutationOptions,
	reconnectMutationOptions,
	getBalanceQueryOptions,
	readContractQueryOptions
} from '@wagmi/core/query';
import { createQuery, createMutation } from '@tanstack/svelte-query';
import { PUBLIC_SEPOLIA_URL, PUBLIC_USDT_CONTRACT_ADDRESS } from '$env/static/public';
import abi from '$lib/abi/erc20.abi.json';
import BigNumber from 'bignumber.js';

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

const unwatchAccount = watchAccount(config, {
	onChange(data) {
		ethereumStore.account = data;
	}
});

const unwatchConnections = watchConnections(config, {
	onChange(data) {
		// Create Map from connections to remove duplicates
		const connectionsMap = data.reduce((map, connection) => {
			if (!config.state.current) return map;
			map.set(config.state.current, connection);
			return map;
		}, new Map<string, Connection>());
		config.setState({
			...config.state,
			connections: connectionsMap
		});
	}
});

function createOnConnectMutation() {
	return createMutation({
		...connectMutationOptions(config)
	});
}

function createOnDisconnectMutation() {
	return createMutation({
		...disconnectMutationOptions(config)
	});
}

function createOnReconnectMutation() {
	return createMutation({
		...reconnectMutationOptions(config)
	});
}

function createGetBalanceQuery() {
	return createQuery({
		...getBalanceQueryOptions(config, {
			address: ethereumStore.account.address,
			token: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
		}),
		enabled: ethereumStore.account.isConnected,
		retry: false
	});
}

function createGetBalanceFromContractQuery() {
	return createQuery({
		...readContractQueryOptions(config, {
			abi,
			address: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`,
			functionName: 'balanceOf',
			args: [ethereumStore.account.address]
		}),
		select: (data) => {
			if (typeof data === 'bigint') return new BigNumber(data.toString()).dividedBy(1e6).toString();
			return data;
		},
		enabled: ethereumStore.account.isConnected,
		retry: false
	});
}

export {
	unwatchAccount,
	unwatchConnections,
	createGetBalanceQuery,
	createGetBalanceFromContractQuery,
	createOnConnectMutation,
	createOnDisconnectMutation,
	createOnReconnectMutation,
	ethereumStore
};
