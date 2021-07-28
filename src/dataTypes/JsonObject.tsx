import React, { useState, useEffect } from 'react';
import ValueTypes from './DataTypes';
import DataLabel from './DataLabel';
import { getTypes } from './getTypes';
import ToggleIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
// import CancelIcon from '@material-ui/icons/Cancel';
// import EditIcon from '@material-ui/icons/Edit';
// import  ToggleIcon  from 'caret-square-right-solid.svg';
// import  DeleteIcon  from 'trash-alt-regular.svg';
// import  CancelIcon  from 'times-circle-solid.svg';

interface objectState{
  value?:{[key:string]:any}|undefined,
  dataKey:string|number,
  dataType:string|undefined,
  onEdit:(newVale:any,key:string|number)=>void,
  onDelete:(dataKey:string|number)=>void,
}

const JsonObject:React.FC<objectState> = ({ value, dataKey, dataType, onDelete}:objectState) => {
  const [col, setCol] = useState(true);
  const [keys, setKeys] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState<objectState["value"]>({});
  useEffect(() => {
    setCurrentValue(value);
    setKeys(Object.keys(value?value:""));
  }, [value]);
  const EditOneProperty = (newValue:any, key:string|number):void => {
    let newObj:{[key:string]:any}|undefined = {...currentValue};
    newObj[key]=newValue;
    setCurrentValue(newObj);
  };
  const DeleteOneProperty = (key:any) :void=> {
    let newObj:{[key:string]:any}={...currentValue};
    // newObj = _.omit(currentValue, key);
    currentValue?delete newObj[key]:""
    newObj?setCurrentValue(newObj):""
    newObj?setKeys(Object.keys(newObj)):""
  };

  const renderObject = () => {
    return keys.map((k:string,i:number) => {
      return (
        <ValueTypes
          key={i}
          dataType={currentValue?getTypes(currentValue[k]):""}
          dataValue={currentValue?currentValue[k]:""}
          dataKey={k}
          onEdit={EditOneProperty}
          onDelete={DeleteOneProperty}
        />
      );
    });
  };
  const renderObjContent = () => {
    if (col)
      return (
        <div style={{padding:5,marginLeft:6}}>
          <div onClick={toggleObj}>
            <ToggleIcon onClick={toggleObj} className='collapseIcon'style={{cursor: 'pointer',height: 16,color: '#3c8dad',marginTop: 5}} />
            <span>"{dataKey}"</span>

            <span>:</span>
            <span style={{fontWeight:"bold",paddingLeft:5}}>{'{'}</span>
            <span>
              <DeleteIcon
              style={{cursor: 'pointer',color: 'rgb(184, 59, 59)'}}
                className='deleteIcon'
                onClick={() => {
                 onDelete(dataKey);
                }}
              />

              {/* <CancelIcon className='cancelIcon'style={{cursor: 'pointer'}} /> */}
            </span>
            <DataLabel type={dataType?dataType:""} />
          </div>
          <div style={{paddingLeft:12}}>
            {renderObject()}
            <div>
              <span style={{fontWeight:"bold"}}>{'}'}</span>
            </div>
          </div>
        </div>
      );
    return (
      <div style={{padding:5,marginLeft:6}}>
        <div>
          <ToggleIcon onClick={toggleObj} className='collapseIcon' style={{cursor: 'pointer',height: 16,color: '#3c8dad',marginTop: 5}} />"{dataKey}
          ":
          <span style={{fontWeight:"bold"}}>
            {'{'}
            <DataLabel type={dataType?dataType:""} />
          </span>
          <span style={{color:"gray"}}>{keys.length} items</span>
          <span style={{fontWeight:"bold"}}>{'}'}</span>
        </div>
      </div>
    );
  };
  const toggleObj = () => {
    // setCurrentValue(currentValue);
    setCol(!col);
  };
  return renderObjContent();
};

export default JsonObject;
