import React, { useState, useEffect } from 'react';
import ValueTypes from './DataTypes';
import DataLabel from './DataLabel';
import { getTypes } from './getTypes';
import ToggleIcon from '@material-ui/icons/PlayCircleFilled';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
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
        <div className='p5 ml6'>
          <div onClick={toggleObj}>
            <ToggleIcon onClick={toggleObj} className='collapseIcon' />
            <span>"{dataKey}"</span>

            <span>:</span>
            <span className='boldStyle pl5'>{'{'}</span>
            <span>
              <DeleteIcon
                className='deleteIcon'
                onClick={() => {
                 onDelete(dataKey);
                }}
              />

              <CancelIcon className='cancelIcon' />
            </span>
            <DataLabel type={dataType?dataType:""} />
          </div>
          <div className='pl12'>
            {renderObject()}
            <div>
              <span className='boldStyle'>{'}'}</span>
            </div>
          </div>
        </div>
      );
    return (
      <div className='p5 ml6'>
        <div>
          <ToggleIcon onClick={toggleObj} className='collapseIcon' />"{dataKey}
          ":
          <span className='boldStyle'>
            {'{'}
            <DataLabel type={dataType?dataType:""} />
          </span>
          <span className='colorGray'>{keys.length} items</span>
          <span className='boldStyle'>{'}'}</span>
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
