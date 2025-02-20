# Sepolia-Wallet

Web interface to see the balance of USDT of an account from the Sepolia chain.

## How to run it

```bash
# install dependencies
yarn

# run the project
yarn dev

# run tests
yarn test:e2e
```

## Environment Variables

There is a `env.dist` file, use it to create the `.env` file

```bash
# Custom RPC URL for the Sepolia chain, if there is no value, wagmi will use the default one
PUBLIC_SEPOLIA_URL=

# Contract address for the USDT token
PUBLIC_USDT_CONTRACT_ADDRESS=
```
## Supported Wallets
- MetaMask


