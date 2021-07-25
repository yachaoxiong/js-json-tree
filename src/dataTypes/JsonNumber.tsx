import React, { useState, useEffect } from 'react';
import DataLabel from './DataLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

// import  EditIcon  from 'edit-solid.svg';
// import  DeleteIcon  from 'trash-alt-regular.svg';
// import  CancelIcon  from 'times-circle-solid.svg';
interface numberState{
  value:number,
  dataKey:string|number,
  dataType:string,
  onEdit:(newVale:any,key:string|number)=>void,
  onDelete:(dataKey:string|number)=>void,
}
const JsonNumber = ({ value, dataKey, dataType, onEdit, onDelete }:numberState) => {
  const [currentValue, setCurrentValue] = useState<numberState["value"]|any>();
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const showEditInput = () => {
    setShowInput(true);
  };
  const editValue = () => {
    onEdit(currentValue, dataKey);
    setShowInput(false);
  };
  const deleteValue = () => {
    onDelete(dataKey);
    setShowInput(false);
  };
  const cancelEdit = () => {
    setShowInput(false);
  };
  return (
    <div className='p5'>
      <span>
        <span>"</span>
        <span>{dataKey}</span>
        <span>"</span> : <DataLabel type={dataType} />
        {showInput ? (
          <span>
            <input
              className='p5 NumProperty'
              type='number'
              defaultValue={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />

            <EditIcon className='editIcon' onClick={editValue} />

            <DeleteIcon className='deleteIcon' onClick={deleteValue} />

            <CancelIcon className='cancelIcon' onClick={cancelEdit} />
          </span>
        ) : (
          <span style={{ color: 'blue' }} onClick={showEditInput}>
            {currentValue}
          </span>
        )}
      </span>
    </div>
  );
};

export default JsonNumber;
