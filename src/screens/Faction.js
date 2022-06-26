import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bareAxios as axios } from '../services/Axios';
import useStorage from '../hooks/useStorageHooks';
import { Input } from '../components';

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

  const onSubmit = async (e) => {
    e.preventDefault();
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

  return <div className='faction'>
    <h2 className={loading ? `h2 skeleton` : 'h2'}>{!loading && (label || 'New faction')}</h2>
    <div className='editform rounded padding shadow'>
      <form onSubmit={onSubmit}>
        <Input type='text'   label='Name' value={faction.name} onChange={(name) => setFaction(prev => ({ ...prev, name }))} />
        <Input type='select' label='Tendency' value={faction.tendency_id} onChange={tendency_id => setFaction(prev => ({ ...prev, tendency_id }))} options={resources['tendencies']} />
        <Input type='number' label='Commodities' value={faction.commodities || 0} onChange={commodities => setFaction(prev => ({ ...prev, commodities }))} InputLabelProps={{ shrink: true }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        <Input type='submit' onClick={onSubmit}>Tallenna</Input>
      </form>
    </div>
  </div>
}

export default Faction;
