import React from 'react';
import Loading from './Loading';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Input = ({ type, name, onChange, onClick, value, options, label, valueKey = 'name', children, loading, ...props }) => {

  const handleOnChange = (e, value) => {
    e.preventDefault();
    onChange(value);
  };

  return <div {...props}>
    {label && <label htmlFor={name}>{label}</label>}
    {type === 'select' && !!options && <div>
      <span className="input button dropdown" name={name}>
        <div>{Object.entries(options.filter(item => item.id === value)[0] || {[valueKey]: 'Valitse jotain'}).map(([entryKey, value]) => entryKey === valueKey && value)}</div>
        <ul className="dropdown-content">
          <li><a href='_blank' className='dropdown-element' onClick={e => handleOnChange(e, null)}>Deselect</a></li>
          {options.map((option, i) => <li key={i}>
            <a href='_blank' className='dropdown-element' onClick={e => handleOnChange(e, option.id)}>{option[valueKey]}</a>
          </li>)}
        </ul>
      </span>
    </div>}
    {type === 'submit' && <button className='input button' onClick={onClick}>
      {loading ? <Loading /> : <span className='buttonchildren'>
        <Icon icon='floppy-disk' />
        <div className='buttonchild'>{children}</div>
      </span>}
    </button>}
    {!['submit', 'select'].includes(type) && <input className='input' type={type} name={name} onChange={(e) => handleOnChange(e, e.target.value)} value={value} />}
  </div>
}

export default Input;
