import React from 'react';
import Races from './screens/Races';
import Race from './screens/Race';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

const links = [
  {
    name: 'Koti',
    url: '/'
  },
  {
    name: 'Rodut',
    url: 'races'
  },
  {
    name: 'Järjestelmät',
    url: 'systems'
  }
];

const App = () => {

  return (
    <div className='App'>
      <div className='sideBar'>
        <ul className='links'>
        { links.map((link, i) => <li key={i}><Link to={link.url}>{link.name}</Link></li> )}
        </ul>
      </div>
      <div className='content'>
        <Routes>
          <Route path="/" element={<div>
            <h1>Koti</h1>
          </div>} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:id" element={<Race />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
