import React, { useState, useEffect } from 'react';
import { bareAxios as axios} from '../services/Axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useStorage from '../hooks/useStorageHooks';
import { Input, Icon, Button, Loading } from '../components';
import { Technology as TechnologyConstructor, TechnologyType } from '../constants';

const Technology = () => {
  const [ technology, setTechnology ] = useState(new TechnologyConstructor());
  const [ prerequisites, setPrerequisites ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ submitting, setSubmitting ] = useState(false);

  const { resources, getResource } = useStorage();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    getResource('factions');
    getResource('technology_types');
    if(id !== 0) {
      axios.get(`technologies/${id}`).then(res => {
        setTechnology(res.data);
        setPrerequisites(res.data.prerequisites);
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
    e?.preventDefault();
    setSubmitting(true);
    try {
      let res;
      if(technology.id) {
        res = await axios.put(`technologies/${technology.id}`, { ...technology, prerequisites });
      } else {
        res = await axios.post('technologies', { ...technology, prerequisites });
      }
      navigate(`/technologies/${res.data.id}`, { state: { name: res.data.name }});
    } catch(e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  const addPrerequisite = () => {
    setPrerequisites(prev => [...prev, new TechnologyType()]);
  };

  const removePrerequisite = (index) => {
    setPrerequisites(prev => prev.filter((_, i) => i !== index));
  };

  const onChangePrerequisite = (index, id) => {
    const pre = [...prerequisites];
    pre[index] = resources['technology_types'].find(t => t.id === id);
    console.log(pre);
    setPrerequisites(pre);
  };

  return <div className='technology margin'>
    <h2 className={`h2 ${loading && 'skeleton'}`}>{state?.name || 'Technology'}</h2>
    <div className='editform rounded padding shadow'>
      <form onSubmit={onSubmit}>
        <Input className='margin-top' type='text' label='Name' value={technology.name} onChange={(name) => setTechnology(prev => ({ ...prev, name }))} />
        <Input className='margin-top' type='text' label='Image URL' value={technology.image_url} onChange={(image_url) => setTechnology(prev => ({ ...prev, image_url }))} />
        <Input className='margin-top' type='number' label='Level' value={technology.level || 0} onChange={level => setTechnology(prev => ({ ...prev, level }))} />
        <Input className='margin-top' type='select' label='Faction ID' value={technology.faction_id} onChange={faction_id => setTechnology(prev => ({ ...prev, faction_id }))} options={resources['factions']} />
        <Input className='margin-top' type='select' label='Type ID' value={technology.technology_type_id} onChange={technology_type_id => setTechnology(prev => ({ ...prev, technology_type_id }))} options={resources['technology_types']} />
        <Input className='margin-top' type='submit' onClick={onSubmit} loading={submitting}>Tallenna</Input>
      </form>
    </div>
    <div className='row margin-top'>
      <h3 className='h3'>Prerequisites</h3>
      <Button icon='plus' className='margin' onClick={addPrerequisite}>Add new</Button>
    </div>
    { !!prerequisites && prerequisites.map((prerequisite, i) => {
      return <div key={i} className='editform rounded padding shadow margin-top'>
        <Button icon='times' className='margin-top transparent' onClick={() => removePrerequisite(i)}>Remove prerequisite</Button>
        <form onSubmit={onSubmit}>
          <Input
            type='select'
            className='margin-top'
            label='Type'
            value={prerequisite.id}
            onChange={(id) => onChangePrerequisite(i, id)} 
            options={resources['technology_types']}
            valueKey='name'
          />
        </form>
      </div>
    })}
  </div>
}

export default Technology;
