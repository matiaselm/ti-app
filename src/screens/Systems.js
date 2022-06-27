import React, { useState, useEffect } from 'react';
import { bareAxios as axios } from '../services/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table } from '../components';

const Faction = () => {
  const [ systems, setSystems ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSystems();
  }, []);

  const getSystems = async () => {
    try {
      const res = await axios.get('systems');
      setSystems(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  const columns = {
    id: {
      label: 'ID',
      transform: id => <Link to={`/systems/${id}`}>{id}</Link>
    },
    type: {
      label: 'Type'
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
    <h2>Systems</h2>
    <Link to='/systems/0'>Create</Link>
    <Table data={systems} columns={columns} actions={actions} />
  </div>
}

export default Faction;
