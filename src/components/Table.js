import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Table = ({ data = [], columns, actions }) => {
  const onClickAction = (e, row, handler) => {
    e?.preventDefault();
    if(typeof handler === 'function') {
      handler(row);
    }
  }

  return <table>
    <thead>
      <tr>
        { !!actions && <th>Actions</th> }
        { Object.entries(columns).map(([key, value]) => <th key={key} style={value.style}>{value.label || key}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => <tr key={i}>
        {!!actions && <td className='row'>
          {actions.map((action, i) => <a key={i} href={ action.intent } onClick={e => onClickAction(e, row, action.handler)} className='rowitem'>
            <Icon icon={action.icon} />
          </a>)}
        </td>}
        {Object.entries(columns).map(([key, options]) => <td key={key} style={{ minHeight: '2em' }}>
          {options.transform ? options.transform(row[key]) : typeof row[key] !== 'object' && row[key]}
        </td>
        )}
      </tr>
      )}
    </tbody>
  </table>
}

export default Table;
