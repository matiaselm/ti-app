import React, { useState } from 'react';
import Input from './Input';

const Form = ({ data, keys, options, onChange, className }) => {

  const [ innerData, setInnerData ] = useState(data);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onChange(innerData);
  };

  const handleOnChange = (value, key) => {
    setInnerData(prev => ({ ...prev, [key]: value }));
  };

  return <form className={`form ${className}`} onSubmit={handleOnSubmit}>
    {(keys ? keys : Object.keys(innerData)).map((key) => {
      const value = innerData[key];
      if (typeof value === 'number') {
        return <Input type={'number'} key={key} label={key} value={value} onChange={(value) => handleOnChange(value, key)} />;
      }
      if (typeof value === 'string') {
        return <Input type={'text'} key={key} label={key} value={value} onChange={(value) => handleOnChange(value, key)} />;
      }
      if (typeof value === 'boolean') {
        return <Input type={'checkbox'} key={key} label={key} value={value} onChange={(value) => handleOnChange(value, key)} />;
      }
      if (Array.isArray(options[key])) {
        return <Input type={'select'} valueKey={key} key={key} label={key} value={value} options={options[key]} onChange={(value) => handleOnChange(value, key)} />;
      }
      if (typeof value !== 'object') {
        return <Input label={key} key={key} value={value} onChange={value => setInnerData(prev => ({ ...prev, [key]: value }))} />
      }
    })}
    <Input type='submit'>Tallenna</Input>
  </form>
}

export default Form;
