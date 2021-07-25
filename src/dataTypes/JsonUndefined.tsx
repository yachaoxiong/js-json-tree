import React from 'react';
import DataLabel from './DataLabel';
interface undefinedState{
  value:[],
  dataKey:string|number,
  dataType:string,

}
const Unde = ({ value, dataKey, dataType }:undefinedState) => {
  return (
    <div style={{ padding: 5 }}>
      <span>
        <span>"</span>
        <span>{dataKey}</span>
        <span>"</span> : <DataLabel type={dataType} />
        <span style={{ color: 'blue' }}>{value}</span>
      </span>
    </div>
  );
};

export default Unde;
