import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Button = ({ onClick, loading, icon, children, className }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    onClick(e);
  }

  return <button className={`button ${className ? className : ''}`} onClick={handleOnClick}>
    { loading ? <Loading /> : <div className='buttonchildren'>
      {icon && <Icon icon={icon} />}  
      <span className='buttonchild'>{children}</span>
    </div>}
  </button>
}

export default Button;
