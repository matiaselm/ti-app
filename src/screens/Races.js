import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link } from 'react-router-dom';
import Table from '../components/Table';

const Races = () => {
  const [ races, setRaces ] = useState([]);

  useEffect(() => {
    getRaces();
  }, []);

  const getRaces = async () => {
    try {
      const res = await axios.get('races');
      setRaces(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  const columns = {
    id: {
      label: 'ID',
      transform: id => <Link to={`/races/${id}`}>{id}</Link>
    },
    name: {
      label: 'Name'
    },
    commodities: {
      label: 'Commodities'
    },
    tendency: {
      label: 'Tendency',
      transform: tendency => tendency?.name
    },
  };

  const actions = [
    {
      name: 'Poista',
      handler: row => {
        if(window.confirm('Are you sure?')) {
          axios.delete(`races/${row.id}`).then(res => {
            getRaces();
          }).catch(console.error);
        }
      }
    }
  ];

  return <div className='content'>
    <h1>Factions</h1>
    <Link to='/races/0'>Create new</Link>
    <Table data={races} columns={columns} actions={actions} />
  </div>
  
}

export default Races;
