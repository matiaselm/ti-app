import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Input, Button } from '../components';
import debounce from '../hooks/useDebounce';

const Faction = () => {
  const [ systems, setSystems ] = useState([]);
  const [ search, setSearch ] = useState('');
  const navigate = useNavigate();

  const getSystems = async () => {
    try {
      const res = await axios.get('systems', { params: { search }});
      setSystems(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    debounce(getSystems, search);
  }, [search]);

  useEffect(() => {
    getSystems();
  }, []);

  const columns = {
    id: {
      label: 'ID',
      transform: id => <Link to={`/systems/${id}`}>{id}</Link>
    },
    planets_count: {
      label: 'Planets',
    },
    faction: {
      label: 'Faction',
      transform: faction => !!faction && faction.name
    },
    anomaly: {
      label: 'Anomaly',
      transform: anomaly => !!anomaly && anomaly.type
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
          axios.delete(`systems/${row.id}`).then(res => {
            getSystems();
          }).catch(console.error);
        }
      }
    },
    {
      icon: 'pen',
      intent: 'edit',
      handler: row => navigate('/systems/' + row.id)
    },
  ];

  return <div>
    <div className='tools'>
      <h2 className='tool'>Systems</h2>
      <Input  className='tool margin' style={{ flex: 2 }} type='text' value={search} onChange={setSearch} placeholder='Search' />
      <Button className='tool margin' icon='plus' onClick={() => navigate('/systems/0')}>Create new</Button>
    </div>
    <Table data={systems} columns={columns} actions={actions} />
  </div>
}

export default Faction;
