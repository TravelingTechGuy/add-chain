import React, {useEffect, useState} from 'react';
import ForkMeOnGithub from 'fork-me-on-github';
import Bridges from './Bridges';
import './App.css';

const chainsUrl = 'https://chainid.network/chains.json';

const App = () => {
  const [chains, setChains] = useState([]);
  const [selectedChain, setSelectedChain] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [currentNetwork, setCurrentNetwork] = useState(undefined);
  const [showChainData, setShowChainData] = useState(false);

  const addChain = async () => {
    const {chainId, name: chainName, rpc: rpcUrls, nativeCurrency, infoURL} = chains[selectedChain];
    const method = [1, 3, 4, 42, 420].includes(chainId) ? 'wallet_updateEthereumChain' : 'wallet_addEthereumChain';
    //const method = 'wallet_addEthereumChain';
    try {
      await window.ethereum.request({
        method,
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          chainName,
          nativeCurrency,
          rpcUrls,
          blockExplorerUrls: [infoURL]
        }]
      });
    }
    catch(err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const getChains = async () => {
      try {
        const response = await fetch(chainsUrl);
        const chains = await response.json();
        chains.sort((a, b) => a.name.localeCompare(b.name));
        setChains(chains);
      }
      catch(err) {
        console.error(err);
        setError(err.message);
      }
    };
    getChains();
  }, []);

  useEffect(() => {
    const getWallet = async () => {
      if(!chains.length) {
        return;
      }
      try {
        const {ethereum} = window;
        if(!ethereum) {
          throw new Error('Please install a Web3 wallet (like Metamask)');
        }
        ethereum.autoRefreshOnNetworkChange = false;
        ethereum
          .on('accountsChanged', () => {window.location.reload();})
          .on('chainChanged', () => {window.location.reload();});
        const networkId = await ethereum.request({method: 'net_version'});
        const current = chains.findIndex(({chainId}) => chainId === parseInt(networkId, 10));
        setCurrentNetwork(current);
      }
      catch(err) {
        console.error(err);
        setError(err.message);
      }
    };
    getWallet();
  }, [chains]);

  return (
    <div className="App">
      <ForkMeOnGithub
        repo="https://github.com/TravelingTechGuy/add-chain"
        side="right"
        colorBackground="#7b38d8"
        colorOctocat="white"
      />
      <header>
        <img src="https://travelingtechguy.github.io/add-chain/favicon/favicon-32x32.png" alt="icon" className="logo" />
        <h1>MetaMask Chains</h1>
      </header>
      <main>
        <h2>Add a new chain to your MetaMask</h2>
        {error &&
          <div>
            <div className="segment error">{error}</div>
            <button
              className="button errorButton"
              onClick={() => setError(undefined)}>
                Clear error and try again
            </button>
          </div>
        }
        <div className="segment network">
          Current network: {currentNetwork !== undefined ? chains[currentNetwork].name : 'Development'}
        </div>
        <div>
          {
            chains.length &&
            <select onChange={e => setSelectedChain(e.target.value)}>
              {
                chains.map(({name, shortName}, i) => <option value={i} key={shortName}>{name}</option>)
              }
            </select>
          }
          {selectedChain &&
            <>
              <button
                className="button addButton"
                onClick={addChain}>
                  Add selected chain
              </button>
              <button 
                className="button chainButton"
                onClick={() => setShowChainData(!showChainData)}>
                  {showChainData ? 'Hide': 'Show'} Chain data
              </button>
              {showChainData &&
                <div className="chainData">
                  <code>
                    <pre>{JSON.stringify(chains[selectedChain], null, 2)}</pre>
                  </code>
                </div>
              }
            </>
          }
        </div>
        <hr/>
        <Bridges />
      </main>
    </div>
  );
}

export default App;
