import React, { useState } from 'react';
import Input from './Input';

const Form = ({ data, onChange }) => {

  const [ innerData, setInnerData ] = useState(data);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onChange(innerData);
  };

  return <form className='form' onSubmit={handleOnSubmit}>
    {Object.entries(innerData).map(([key, value]) => {
      if (typeof value !== 'object') {
        return <Input label={key} key={key} value={value} onChange={value => setInnerData(prev => ({ ...prev, [key]: value }))} />
      }
    })}
    <Input type='submit'>Tallenna</Input>
  </form>
}

export default Form;
