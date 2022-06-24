import React, { useState } from 'react';
import './input.css';

const Input = ({ type, name, onChange, value, options, label, key = 'id', valueKey = 'name', children }) => {
  const [ isMenuVisible, setIsMenuVisible ] = useState(false);
  
  const toggleSelect = (e) => {
    e?.preventDefault();
    setIsMenuVisible(!isMenuVisible);
  };

  const handleOnSelect = (e, value) => {
    e.preventDefault();
    onChange(value);
    setIsMenuVisible(false);
  }

  return <div>
    {label && <label htmlFor={name}>{label}</label>}
    {type === 'select' && !!options && <div>
      <button type='button' name={name} onClick={toggleSelect}>
        <>{Object.entries(options.filter(item => item[key] === value)[0] || {[valueKey]: 'Valitse jotain'}).map(([entryKey, value]) => entryKey === valueKey && value)}</>
      </button>
      {isMenuVisible && <ul>
        {options.map((option, i) => <li key={i}>
          <a href='_black' onClick={e => handleOnSelect(e, option[key])}>{option.name || option[key]}</a>
        </li>)}
      </ul>}
    </div>}
    {type === 'submit' && <button>{children}</button>}
    {!['submit', 'select'].includes(type) && <input type={type} name={name} onChange={onChange} value={value} />}
  </div>
}

export default Input;
