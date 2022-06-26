import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bareAxios as axios } from '../services/Axios';
import useStorage from '../hooks/useStorageHooks';
import { Input, Skeleton } from '../components';

const Faction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, getResource } = useStorage();

  const [ faction, setFaction ] = useState({
    name: '',
    commodities: 0,
    tendency_id: 0,
  });
  const [ label, setLabel ]           = useState('');
  const [ loading, setLoading ]       = useState(true);
  const [ submitting, setSubmitting ] = useState(false);

  useEffect(() => {
    getResource('tendencies')
  }, []);

  useEffect(() => {
    if (id != 0) {
      axios.get(`factions/${id}`).then(res => {
        setFaction(res.data);
        setLabel(res.data.name);
      }).catch((e) => {
        console.error(e)
      }).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      let res;
      if(faction.id) {
        res = await axios.put(`factions/${faction.id}`, faction);
      } else {
        res = await axios.post('factions', faction);
      }
      navigate(`/factions/${res.data.id}`);
    } catch(e) {
      console.error(e);
    }
    setSubmitting(false);
  }

  const onChange = (e, key) => {
    console.log(e.target.value, e.target.type)
    setFaction(prev => ({ ...prev, [key]: e.target.value }));
  }

  return <div>
    <h2>{(loading ? <Skeleton width={400} /> : label) || 'New faction'}</h2>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ padding: 10, backgroundColor: '#ccc', borderRadius: '1em' }}>
      {!loading ? <form onSubmit={onSubmit} sx={{ width: '25ch' }}>
        <Input type='text'   label='Name' value={faction.name} onChange={(e) => onChange(e, 'name')} />
        <Input type='select' label='Tendency' value={faction.tendency_id} onChange={(e) => onChange(e, 'tendency_id')} options={[{ id: 0, name: '' }, ...resources['tendencies']]} />
        <Input type='number' label='Commodities' value={faction.commodities || 0} onChange={(e) => onChange(e, 'commodities')} InputLabelProps={{ shrink: true }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        <button loading={submitting} onClick={onSubmit}>Tallenna</button>
      </form> : <>
        <Skeleton width={300} height={40} />
        <Skeleton width={300} height={40} />
        <Skeleton width={300} height={40} />
      </>}
    </div>
    </div>
  </div>
}

export default Faction;
