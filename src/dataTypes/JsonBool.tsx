import React from 'react';
import DataLabel from './DataLabel';
interface BoolState{
  value:[],
  dataKey:string|number,
  dataType:string,

}
const JsonBool = ({ value, dataKey, dataType }:BoolState) => {
  return (
    <div style={{ padding: 5 }}>
      <span>
        <span>"</span>
        <span>{dataKey}</span>
        <span>"</span> : <DataLabel type={dataType} />
        <span style={{ color: 'green' }}>{value}</span>
      </span>
    </div>
  );
};

export default JsonBool;
