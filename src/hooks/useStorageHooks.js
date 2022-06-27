import React, { useState, useEffect } from 'react';
import { bareAxios as axios} from '../services/Axios';

const useStorage = () => {
  const [ resources, setResources ] = useState({});

  const getResource = (key) => {
    let res = localStorage.getItem(key);
    if(!!res) {
      setResources(prev => ({ ...prev, [key]: JSON.parse(res) }));
      return;
    }
    axios.get(key).then(res => {
      localStorage.setItem(key, JSON.stringify(res.data));
      setResources(prev => ({ ...prev, [key]: res.data }));
    }).catch(console.error);
  }

  const removeResource = (key) => {
    localStorage.removeItem(key);
    setResources(prev => ({ ...prev, [key]: []} ));
  }

  return { resources, getResource, removeResource };
}

export default useStorage;
