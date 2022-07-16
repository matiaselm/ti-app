import React, { useState, useEffect } from 'react';
import Placeholder from './screens/Placeholder';
import Systems from './screens/Systems';
import Factions from './screens/Factions';
import Faction from './screens/Faction';
import Technologies from './screens/Technologies';
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
  const [ windowDimension, setWindowDimension ] = useState(null);

  useEffect(() => {
    updateWindowDimensions();
    const dimensionListener = window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', dimensionListener);
    }
  }, [window]);

  const updateWindowDimensions = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  return (
    <div className='App' style={windowDimension ? windowDimension : {}}>
      <div className='navigation padding shadow'>
        { links.map((link, i) => <Link className='padding' key={i} to={link.url}>{link.name}</Link> )}
      </div>
      <div className='content'>
        <Routes>
          <Route path="*" element={<Placeholder />} />
          <Route path="/" element={<Factions />} />
          <Route path="/factions/:id" element={<Faction />} />
          <Route path="/systems/" element={<Systems />} />
          <Route path="/technologies/" element={<Technologies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
