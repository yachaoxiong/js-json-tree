import React, { useState, useEffect } from 'react';
import DataLabel from './DataLabel';
import DateTypes from './DataTypes';
import ToggleIcon from '@material-ui/icons/PlayCircleFilled';
// import  ToggleIcon  from 'caret-square-right-solid.svg';
import { getTypes } from './getTypes';
interface arrState{
  value:Array<JsArrType>,
  dataKey:number|string,
  dataType:string,
  onEdit?:(newvalue:any,key:string|number)=>void,
  onDelete?:(dataKey:string|number)=>void,
}
interface JsArrType {
  [index: number]: any
}
const JsonArray = ({ value, dataKey, dataType }:arrState) => {
  const [col, setCol] = useState(false);
  const [currentValue, setCurrentValue] = useState<arrState["value"]>([]);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const editOneFromArray = (newValue:any, key:number|string):void => {
    let temp_state = [...currentValue];
   if(typeof key==="number")  temp_state[key] = newValue;
    setCurrentValue(temp_state);
  };
  const deleteOneFromArray = (key:number|string):void  => {
    let tempArray = [...currentValue];
    if(typeof key==="number")  tempArray.splice(key, 1);
    setCurrentValue(tempArray);
  };
  const renderArrayContent = () => {
    return currentValue.map((v:any, i:number) => {
      let type:string = getTypes(v);
      return (
        <DateTypes
          key={i}
          dataValue={v}
          dataType={type}
          dataKey={i}
          onEdit={editOneFromArray}
          onDelete={deleteOneFromArray}
        />
      );
    });
  };
  const renderContent = () => {
    if (col) {
      return (
        <div style={{padding:5,marginLeft:6}}>
          <span>
            <ToggleIcon onClick={toggleArray} className='collapseIcon'style={{cursor: 'pointer',height: 16,color: '#3c8dad',marginTop: 5}} />
            <span>"</span>
            <span>{dataKey}</span>
            <span>"</span> : <DataLabel type={dataType} />
            <span style={{fontWeight:"bold"}}>[</span>
            <span className='colorGray'>{currentValue.length} items</span>
            <span style={{fontWeight:"bold"}}>]</span>
          </span>
        </div>
      );
    }
    return (
      <div style={{padding:5,marginLeft:6}}>
        <span>
          <ToggleIcon onClick={toggleArray} className='collapseIcon' style={{cursor: 'pointer',height: 16,color: '#3c8dad',marginTop: 5}} />
          <span>"</span>
          <span>{dataKey}</span>
          <span>"</span> : <DataLabel type={dataType} />
          <span style={{fontWeight:"bold"}}>[</span>
          {renderArrayContent()}
          <span style={{fontWeight:"bold"}}>]</span>
        </span>
      </div>
    );
  };

  const toggleArray = () => {
    setCol(!col);
  };
  return renderContent();
};

export default JsonArray;
