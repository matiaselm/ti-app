import React, { useState, useEffect } from 'react';
import './table.css'

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
        {!!actions && actions.map((action, i) => <td key={i}><a href='_blank' onClick={e => onClickAction(e, row, action.handler)}>{action.name}</a></td>)}
        {Object.entries(columns).map(([key, options]) => {
          if (typeof options?.transform === 'function') {
            return <td key={key}>{options.transform(row[key], row)}</td>
          }
          if (typeof row[key] !== 'object') {
            return <td key={key} style={options?.style}>{row[key]}</td>
          }
          return <td key={key} style={options?.style}></td>
        })}
      </tr>
      )}
    </tbody>
  </table>
}

export default Table;
