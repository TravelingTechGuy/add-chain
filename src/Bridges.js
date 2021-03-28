import React, {useState} from 'react';
import bridges from './bridges.json';

const Bridges = () => {
  const [edge1, setEdge1] = useState(undefined);
  const [edge2, setEdge2] = useState(undefined);
  const [bridge, setBridge] = useState(undefined);
  const [error, setError] = useState(undefined);
  
  const findBridge = () => {
    try {
      setError(undefined);
      if(!edge1) throw new Error('Plaese select "from" chain');
      if(!edge2) throw new Error('Plaese select "to" chain');
      if(edge1 === edge2) throw new Error('Plaese select 2 different chains');
      const bridge = bridges.find(b => (b.edge1 === edge1 && b.edge2 === edge2) || (b.edge1 === edge2 && b.edge2 === edge1));
      setBridge(bridge);
      if(!bridge) {
        throw new Error(`Couldn't find bridge between ${edge1} and ${edge2} - try a different route`);
      }
    }
    catch(err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Find a bridge between chains</h2>
      {error && <div className="segment error">{error}</div>}
      From:&nbsp;
      <select onChange={e => setEdge1(e.target.value)}>
        <option value="">Select "From" chain</option>
        <option value="Ethereum">Ethereum</option>
        <option value="xDai">xDai</option>
        <option value="Binance Smart Chain">Binance Smart Chain</option>
        <option value="Matic">Matic</option>
      </select>
      &nbsp;&nbsp;To:&nbsp;
      <select onChange={e => setEdge2(e.target.value)}>
        <option value="">Select "To" chain</option>
        <option value="Ethereum">Ethereum</option>
        <option value="xDai">xDai</option>
        <option value="Binance Smart Chain">Binance Smart Chain</option>
        <option value="Matic">Matic</option>
      </select>
      &nbsp;&nbsp;
      <button 
        className="button chainButton"
        onClick={findBridge}>
          Find bridge
      </button>
      {bridge &&
        <div className="chainData">
          Use the <b>{bridge.name}</b> at <a target="_blank" rel="noreferrer" href={bridge.url}>{bridge.url}</a>
          {bridge.comment && <><br/><b>Comment:</b> {bridge.comment}</>}
        </div>
      }
    </div>
  )
};

export default Bridges;