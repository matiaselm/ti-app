import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Input, Button } from '../components';
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
    image_url: {
      label: 'Image',
      transform: image_url => !!image_url && <img style={{ objectFit: 'cover', maxWidth: 100 }} src={image_url} alt={image_url} />
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
    <div className='tools'>
      <h2 className='tool'>Factions</h2>
      <Input  className='tool margin' style={{ flex: 2 }} type='text' value={search} onChange={setSearch} placeholder='Search' />
      <Button className='tool margin' icon='plus' onClick={() => navigate('/factions/0')}>Create new</Button>
    </div>
    <Table data={factions} columns={columns} actions={actions} />
  </div>
}

export default Faction;
