import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bareAxios as axios } from '../services/Axios';
import { tendencies } from '../constants';
import useStorage from '../hooks/useStorageHooks';
import Input from '../components/Input';
import './form.css';

const Race = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, getResource } = useStorage();

  const [ race, setRace ] = useState({
    name: '',
    commodities: 0,
    tendency_id: 0,
  });
  const [ label, setLabel ] = useState('');

  useEffect(() => {
    getResource('tendencies')
  },[]);

  useEffect(() => {
    if(id != 0) {
      axios.get(`races/${id}`).then(res => {
        setRace(res.data);
        setLabel(res.data.name);
      }).catch(console.error);
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(race.id) {
        res = await axios.put(`races/${race.id}`, race);
      } else {
        res = await axios.post('races', race);
      }
      navigate(`/races/${res.data.id}`);
    } catch(e) {
      console.error(e);
    }
  }

  const onChange = (e) => {
    setRace(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return <div>
    <h1>{label || 'Uusi rotu'}</h1>
    <form onSubmit={onSubmit}>
      <Input label='Nimi' name='name' type='text' value={race.name} onChange={onChange} />
      <Input label='Taipumus' name='tendency_id' type='select' value={race.tendency_id} options={resources['tendencies']} onChange={tendency_id => setRace(prev => ({...prev, tendency_id }) )} />
      <Input label='Tuotanto' name='commodities' type='number' value={race.commodities} onChange={onChange} />
      <Input type='submit'>Tallenna</Input>
    </form>
  </div>
}

export default Race;
