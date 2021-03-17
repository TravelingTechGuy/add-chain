# Add new chains to your MetaMask

This app shows how to programatically add a new Ethereum chain to your MetaMask (should potentially work on any other wallet that supports RPC calls). 

You can see a version of it [running here](https://travelingtechguy.github.io/add-chain/).

The app relies on 2 sources:

1. [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) - the EIP proposing RPC call `wallet_addEthereumChain`
1. A list of chains maintained by [chainid.network](https://chainid.network/chains.json)

## How to run

1. Clone the repo and `cd` into the folder
1. Run `yarn` (or `npm install`) to install the dependencies
1. Run `yarn start` (or `npm start`)

**Note:** This is a straight forward app. No design, or special UI. You can use the logic, and embed in a much nicer site (see [Chaninlist.org](https://chainlist.org/)).
