import React, { useState, useEffect } from 'react';
import Factions from './screens/Factions';
import Faction from './screens/Faction';
import { Routes, Route, Link } from "react-router-dom";
import './Styles.css';

import './services/IconLibrary';

const links = [
  {
    name: 'Factions',
    url: '/'
  },
  {
    name: 'Systems',
    url: 'systems'
  },
  {
    name: 'Technologies',
    url: 'technologies'
  },
];

const App = () => {
  const [ windowDimension, setWindowDimension ] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log('useEffect window', window);
    const dimensionListener = window.addEventListener('resize', updateWindowDimensions);

    return dimensionListener;
  }, [window]);

  const updateWindowDimensions = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  return (
    <div className='App' style={windowDimension}>
      <div className='navigation'>
        <ul>
        { links.map((link, i) => <li key={i}><Link to={link.url}>{link.name}</Link></li> )}
        </ul>
      </div>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Factions />} />
          <Route path="/factions/:id" element={<Faction />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
