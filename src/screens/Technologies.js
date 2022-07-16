import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Button, Loading, Input } from '../components';
import debounce from '../hooks/useDebounce';

const Technologies = (props) => {
  const [ technologies, setTechnologies ] = useState([]);
  const [ search, setSearch ] = useState('');
  const navigate = useNavigate();

  const getTechnologies = async () => {
    try {
      const res = await axios.get('technologies', { params: { search }});
      setTechnologies(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    debounce(getTechnologies, search);
  }, [search]);

  useEffect(() => {
    getTechnologies();
  }, []);

  const columns = {
    id: {
      label: 'ID',
      transform: id => <Link to={`/technologies/${id}`}>{id}</Link>
    },
    name: {
      label: 'Name',
    },
    level: {
      label: 'Level',
    },
    faction: {
      label: 'Faction',
      transform: faction => !!faction && faction.name
    },
    prerequisites: {
      label: 'Prerequisites',
      transform: prerequisites => !!prerequisites && prerequisites.map(prerequisite => prerequisite.color).join(', ')
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
          axios.delete(`technologies/${row.id}`).then(res => {
            getTechnologies();
          }).catch(console.error);
        }
      }
    },
    {
      icon: 'pen',
      intent: 'edit',
      handler: row => navigate('/technologies/' + row.id, { state: { name: row.name } })
    },
  ];

  return <div>
    <div className='tools'>
      <h2 className='tool'>Technologies</h2>
      <Input  className='tool margin' style={{ flex: 2 }} type='text' value={search} onChange={setSearch} placeholder='Search' />
      <Button className='tool margin' icon='plus' onClick={() => navigate('/technologies/0')}>Create new</Button>
    </div>
    <Table data={technologies} columns={columns} actions={actions} />
  </div>
}

export default Technologies;
