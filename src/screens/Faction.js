import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bareAxios as axios } from '../services/Axios';
import useStorage from '../hooks/useStorageHooks';
import { Input, Icon, Button } from '../components';
import { System, Planet } from '../constants';

const Faction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, getResource } = useStorage();

  const [ faction, setFaction ] = useState({
    name: '',
    commodities: 0,
    tendency_id: 0,
  });

  const [ systems, setSystems ] = useState([]);

  const [ label, setLabel ]           = useState('');
  const [ loading, setLoading ]       = useState(true);
  const [ submitting, setSubmitting ] = useState(false);

  useEffect(() => {
    getResource('tendencies')
    getResource('anomalies')
  }, []);

  useEffect(() => {
    if (id != 0) {
      axios.get(`factions/${id}`).then(res => {
        setFaction(res.data);
        setLabel(res.data.name);
        if(res.data.systems) {
          setSystems(res.data.systems);
        }
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
        res = await axios.put(`factions/${faction.id}`, {...faction, systems });
      } else {
        res = await axios.post('factions', {...faction, systems });
      }
      navigate(`/factions/${res.data.id}`);
    } catch(e) {
      console.error(e);
    }
    setSubmitting(false);
  }

  const addSystem = () => {
    setSystems(prev => ([ ...prev, new System() ]));
  }

  const removeSystem = (i) => {
    setSystems(prev => prev.filter((_, j) => j !== i));
  }

  const onChangeSystems = (i, key, value) => {
    setSystems(prev => {
      const newSystems = [ ...prev ];
      newSystems[i] = { ...newSystems[i], [key]: value };
      return newSystems;
    });
  }

  const addPlanet = (i) => {
    const newSystems = [ ...systems ];
    newSystems[i].planets.push(new Planet());
    setSystems(newSystems);
  }

  const removePlanet = (planetIndex, systemIndex) => {
    const newSystems = [ ...systems ];
    newSystems[systemIndex].planets.splice(planetIndex, 1);
    setSystems(newSystems);
  }

  const onChangePlanets = (planetIndex, systemIndex, key, value) => {
    const newSystems = [ ...systems ];
    newSystems[systemIndex].planets[planetIndex][key] = value;
    setSystems(newSystems);
  }

  return <div className='faction margin'>
    <h2 className={`h2 ${loading && 'skeleton'}`}>{!loading && (label || 'New faction')}</h2>
    <div className='editform rounded padding shadow'>
      <form onSubmit={onSubmit}>
        <Input className='margin-top' type='text'   label='Name'        value={faction.name}             onChange={(name) => setFaction(prev => ({ ...prev, name }))} />
        <Input className='margin-top' type='select' label='Tendency'    value={faction.tendency_id}      onChange={tendency_id => setFaction(prev => ({ ...prev, tendency_id }))} options={resources['tendencies']} />
        <Input className='margin-top' type='number' label='Commodities' value={faction.commodities || 0} onChange={commodities => setFaction(prev => ({ ...prev, commodities }))} />
        <Input className='margin-top' type='submit' onClick={onSubmit} loading={submitting}>Tallenna</Input>
      </form>
    </div>
    <div className='row margin-top'>
      <h3 className='h3'>Systems</h3>
      <Button icon='plus' className='margin' onClick={addSystem}>Add new</Button>
    </div>

    { !!systems && systems.map((system, i) => {
      return <div key={i} className='editform rounded padding shadow margin-top'>
        <Button icon='times' className='margin-top transparent' onClick={() => removeSystem(i)}>Remove system</Button>
        <form onSubmit={onSubmit}>
          <Input type='number' className='margin-top' label='Number' value={system.number} onChange={(number) => onChangeSystems(i, 'number', number)} />
          <Input type='select' className='margin-top' label='Anomaly' value={system.anomaly_id} onChange={(anomaly_id) => onChangeSystems(i, 'anomaly_id', anomaly_id)} options={resources['anomalies']} valueKey='type' />
        </form>
        <Button className='margin-top' onClick={() => addPlanet(i)} icon='plus'>Add planet</Button>
        { system.planets.map((planet, j) => {
          return <div key={j} className='editform'>
            <Button className='margin-top' icon='minus' onClick={() => removePlanet(j, i)}>Remove planet</Button>
            <form onSubmit={onSubmit}>
              <Input type='text' label='Name' value={planet.name} onChange={(name) => onChangePlanets(j, i, 'name', name)} />
              <Input type='text' label='Type' value={planet.type} onChange={(type) => onChangePlanets(j, i, 'type', type)} />
              <div className='row'>
                <Input type='number' label='Production' value={planet.production} onChange={(production) => onChangePlanets(j, i, 'production', production)} />
                <Input type='number' label='Influence'  value={planet.influence}  onChange={(influence) => onChangePlanets(j, i, 'influence', influence)} />
              </div>
            </form>
          </div>
        }) }
      </div>
    })}
  </div>
}

export default Faction;
