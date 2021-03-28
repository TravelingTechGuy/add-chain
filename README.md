# Blockchains and MetaMask

To see the app runing [click here](https://travelingtechguy.github.io/add-chain/).

This app has 2 functions:

## 1. Add new EVM chains to MetaMask

Programatically add a new EVM chain to your MetaMask (should potentially work on any other wallet that supports the RPC call). 

The app relies on 2 sources:

1. [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) - the EIP proposing RPC call `wallet_addEthereumChain`
1. A list of chains maintained by [chainid.network](https://chainid.network/chains.json)

**Comment:** currently there's no way to switch to the Mainnet, or any of the Testnets, that are pre-built into MetaMask. See [this issue](https://github.com/MetaMask/metamask-extension/issues/10597), and follow up when solved.

## 2. Find bridges between blockchains

Not all blockchains provide bridges between each other, but almost all of the profida a bridge from/to Ethereum, to onboad assets. The app basically maps known bridges, and information about them. The graph is described in a file called `bridges.json`.

**Comment**: obviously, more bridges exist out there. You can easily add a PR that updates `bridges.json` with more information. The SVG is created using Draw.io, and can be updated by updating the `bridges.drawio` file.

<img src="https://raw.githubusercontent.com/TravelingTechGuy/add-chain/master/src/bridges.svg" width="100%" height="200">

## How to run the app

1. Clone the repo and `cd` into the folder
1. Run `yarn` (or `npm install`) to install the dependencies
1. Run `yarn start` (or `npm start`)

**Note:** This is a straight forward app. No design, or special UI. You can use the logic, and embed in a much nicer site (see [Chaninlist.org](https://chainlist.org/)).
