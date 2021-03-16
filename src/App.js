import React, {useEffect, useState} from 'react';

const chainsUrl = 'https://chainid.network/chains.json';

const App = () => {
  const [chains, setChains] = useState([]);
  const [selectedChain, setSelectedChain] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [currentNetwork, setCurrentNetwork] = useState(undefined);

  const addChain = async () => {
    const {chainId, name: chainName, rpc: rpcUrls, nativeCurrency, infoURL} = chains[selectedChain];
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          chainName,
          rpcUrls,
          nativeCurrency,
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
    <div style={{textAlign: 'center'}}>
      <header>
        <h1>Add Chain to MetaMask</h1>
      </header>
      <main>
        {error &&
          <div>
            <div style={{background: 'red', color: 'white'}}>{error}</div>
            <button onClick={() => setError(undefined)}>Clear error</button>
          </div>
        }
        <div style={{background: 'blue', color: 'white'}}>
          Current network: {currentNetwork !== undefined ? chains[currentNetwork].name : 'Development'}
        </div>
        {
          chains.length &&
          <select onChange={e => setSelectedChain(e.target.value)}>
            {
              chains.map(({name, shortName}, i) => <option value={i} key={shortName}>{name}</option>)
            }
          </select>
        }
        {selectedChain && <button onClick={addChain}>Add selected chain</button>}
      </main>
    </div>
  );
}

export default App;
