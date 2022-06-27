import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Table = ({ data = [], columns, actions }) => {
  const onClickAction = (e, row, handler) => {
    e?.preventDefault();
    if(typeof handler === 'function') {
      handler(row);
    }
  }

  return <table className='table'>
    <thead className='tablehead'>
      <tr className='tablerow'>
        { !!actions && <th className='tablehead-column'>Actions</th> }
        { Object.entries(columns).map(([key, value]) => <th className='tablehead-column' key={key} style={value.style}>{value.label || key}</th>)}
      </tr>
    </thead>
    <tbody className='tablebody'>
      {data.map((row, i) => <tr key={i} className='tablerow'>
        {!!actions && <td className='tablecolumn row'>
          {actions.map((action, i) => <a key={i} href={ action.intent } onClick={e => onClickAction(e, row, action.handler)} className='flexitem padding'>
            <Icon icon={action.icon} className='actionbutton' />
          </a>)}
        </td>}
        {Object.entries(columns).map(([key, options]) => <td key={key} className='tablecolumn'>
          {options.transform ? options.transform(row[key]) : typeof row[key] !== 'object' && row[key]}
        </td>
        )}
      </tr>
      )}
    </tbody>
  </table>
}

export default Table;
