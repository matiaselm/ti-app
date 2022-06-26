import React from 'react';

const Skeleton = ({ width, color, height }) => {
  return <div style={{ 
    width: width  || '20em',
    heigh: height || '1em',
    color: color  || '#ccc',
  }} />
}

export default Skeleton;
