import React from 'react';
import Loading from './Loading';

const Input = ({ type, name, onChange, onClick, value, options, label, key = 'id', valueKey = 'name', children, loading }) => {

  const handleOnChange = (e, value) => {
    console.log(e, value);
    e.preventDefault();
    onChange(value);
  };

  return <div className='inputcomponent padding'>
    {label && <label htmlFor={name}>{label}</label>}
    {type === 'select' && !!options && <div>
      <span className="dropdown" name={name}>
        <div>{Object.entries(options.filter(item => item[key] === value)[0] || {[valueKey]: 'Valitse jotain'}).map(([entryKey, value]) => entryKey === valueKey && value)}</div>
        <ul className="dropdown-content">
          {options.map((option, i) => <li key={i}>
            <a href='_black' className='dropdown-element' onClick={e => handleOnChange(e, option[key])}>{option.name || option[key]}</a>
          </li>)}
        </ul>
      </span>
    </div>}
    {type === 'submit' && <button onClick={onClick}>{loading ? <Loading /> : children}</button>}
    {!['submit', 'select'].includes(type) && <input type={type} name={name} onChange={(e) => handleOnChange(e, e.target.value)} value={value} />}
  </div>
}

export default Input;
