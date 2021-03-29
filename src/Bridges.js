import React, {useState} from 'react';
import bridges from './bridges.json';
import drawing from './bridges.svg';

const ChainsDropdown = ({direction = '', onChange}) => {
  const edgesList = ((() => {
    let edges = [];
    bridges.forEach(b => {
      edges.push(b.edge1);
      edges.push(b.edge2);
    });
    return [...new Set(edges)].sort();
  })());

  return (
    <select onChange={onChange}>
      <option value="">Select "{direction}" chain</option>
      {edgesList.map(e => <option value={e} key={e}>{e}</option>)}
    </select>
  );
};

const Bridges = () => {
  const [edge1, setEdge1] = useState(undefined);
  const [edge2, setEdge2] = useState(undefined);
  const [paths, setPaths] = useState([]);
  const [error, setError] = useState(undefined);
  
  const findBridge = () => {
    try {
      setError(undefined);
      if(!edge1) throw new Error('Plaese select "from" chain');
      if(!edge2) throw new Error('Plaese select "to" chain');
      if(edge1 === edge2) throw new Error('Plaese select 2 different chains');
      const paths = bridges.filter(b => (b.edge1 === edge1 && b.edge2 === edge2) || (b.edge1 === edge2 && b.edge2 === edge1));
      setPaths(paths);
      if(!paths.length) {
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
      From:&nbsp;
      <ChainsDropdown
        direction="From"
        onChange={e => setEdge1(e.target.value)} 
      />
      &nbsp;&nbsp;To:&nbsp;
      <ChainsDropdown
        direction="To"
        onChange={e => setEdge2(e.target.value)} 
      />
      &nbsp;&nbsp;
      <button 
        className="button chainButton"
        onClick={findBridge}>
          Find bridge
      </button>
      {
        paths.length ? 
          paths.map(p => 
            <div className="chainData">
              Use the <b>{p.name}</b> at <a target="_blank" rel="noreferrer" href={p.url}>{p.url}</a>
              {p.comment && <><br/><b>Comment:</b> {p.comment}</>}
            </div>
          )
        :
          null
      }
      <div className="drawing">
        <img src={drawing} alt="bridges visualization" />
      </div>
    </div>
  )
};

export default Bridges;
