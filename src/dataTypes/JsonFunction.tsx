import React from 'react';
import DataLabel from './DataLabel';
interface FuncState{
  value?:any,
  dataKey:string|number,
  dataType:string,

}
const JsonFunction = ({  dataKey, dataType }:FuncState) => {
  return (
    <div className='p5'>
      <span>
        <span>"</span>
        <span>{dataKey}</span>
        <span>"</span> : <DataLabel type={dataType} />
        <span style={{ color: 'blue' }}>Function()</span>
      </span>
    </div>
  );
};

export default JsonFunction;
