import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Input } from '../components';
import debounce from '../hooks/useDebounce';

const Faction = () => {
  const [ factions, setFactions ] = useState([]);
  const [ search, setSearch ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFactions();
  }, []);

  const getFactions = async () => {
    try {
      const res = await axios.get('factions', { params: { search }});
      setFactions(res.data);
    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    debounce(getFactions, search);
  },[search]);

  const columns = {
    id: {
      label: 'ID',
      transform: id => <Link to={`/factions/${id}`}>{id}</Link>
    },
    name: {
      label: 'Name'
    },
    commodities: {
      label: 'Commodities'
    },
    tendency: {
      label: 'Tendency',
      transform: tendency => !!tendency && tendency.name
    },
    planets_count: {
      label: 'Planets'
    },
    created_at: {
      label: 'Created At',
      transform: created_at => format(new Date(created_at), 'yyyy-MM-dd')
    },
    updated_at: {
      label: 'Updated At',
      transform: updated_at => format(new Date(updated_at), 'yyyy-MM-dd')
    }
  };

  const actions = [
    {
      icon: 'times',
      intent: 'delete',
      handler: row => {
        if(window.confirm('Are you sure?')) {
          axios.delete(`factions/${row.id}`).then(res => {
            getFactions();
          }).catch(console.error);
        }
      }
    },
    {
      icon: 'pen',
      intent: 'edit',
      handler: row => navigate('/factions/' + row.id)
    },
  ];

  return <div>
    <h2>Factions</h2>
    <Input type='text' value={search} onChange={setSearch} className='margin' placeholder='Search' />
    <Link to='/factions/0'>Create</Link>
    <Table data={factions} columns={columns} actions={actions} />
  </div>
}

export default Faction;
