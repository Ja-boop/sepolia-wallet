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
	getBalanceQueryOptions,
	reconnectMutationOptions
} from '@wagmi/core/query';
import { createQuery, createMutation } from '@tanstack/svelte-query';
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
	const mutationOptions = connectMutationOptions(config);

	return createMutation({
		...mutationOptions
	});
}

function createOnDisconnectMutation() {
	const mutationOptions = disconnectMutationOptions(config);

	return createMutation({
		...mutationOptions
	});
}

function createOnReconnectMutation() {
	const mutationOptions = reconnectMutationOptions(config);

	return createMutation({
		...mutationOptions
	});
}

function createBalanceQuery() {
	return createQuery({
		...getBalanceQueryOptions(config, {
			address: ethereumStore.account.address,
			token: PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`
		}),
		enabled: ethereumStore.account.isConnected,
		retry: false
	});
}

export {
	unwatchAccount,
	unwatchConnections,
	createBalanceQuery,
	createOnConnectMutation,
	createOnDisconnectMutation,
	createOnReconnectMutation,
	ethereumStore,
	config
};
