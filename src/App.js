import React, { useState, useEffect } from 'react';
import Systems from './screens/Systems';
import Factions from './screens/Factions';
import Faction from './screens/Faction';
import { Routes, Route, Link } from "react-router-dom";

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
    const dimensionListener = window.addEventListener('resize', updateWindowDimensions);

    return dimensionListener;
  }, [window]);

  const updateWindowDimensions = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  return (
    <div className='App' style={windowDimension}>
      <div className='navigation padding shadow'>
        { links.map((link, i) => <Link className='padding' key={i} to={link.url}>{link.name}</Link> )}
      </div>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Factions />} />
          <Route path="/factions/:id" element={<Faction />} />
          <Route path="/systems/" element={<Systems />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
