import React, { useState, useEffect } from 'react';
import DataLabel from './DataLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

// import  DeleteIcon  from 'trash-alt-regular.svg';
// import CancelIcon from 'times-circle-solid.svg';
// import EditIcon from 'edit-solid.svg';

interface stringState{
  value:number,
  dataKey:string|number,
  dataType:string,
  onEdit:(newVale:any,key:string|number)=>void,
  onDelete:(dataKey:string|number)=>void,
}
const JsonString = ({ value, dataKey, dataType, onEdit, onDelete }:stringState) => {
  const [currentValue, setCurrentValue] = useState<stringState["value"]|any>();
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
    <div style={{ padding: 5 }}>
      <span>
        <span>"</span>
        <span>{dataKey}</span>
        <span>"</span> : <DataLabel type={dataType} />
        <span>"</span>
        <span style={{ color: '#FF6767' }}>
          {showInput ? (
            <span>
              <textarea
                className='textInput'
                style={{ padding: 5 }}
                defaultValue={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
              <span>

                <EditIcon style={{cursor:'pointer',color: 'rgb(4, 126, 126)', padding: '0px 8px',height: 15,width:"auto"}} className='editIcon' onClick={editValue} />
              </span>

              <DeleteIcon style={{cursor:'pointer',color: 'rgb(184, 59, 59)', padding: '0px 8px',height: 18,width:"auto"}}className='deleteIcon' onClick={deleteValue} />

              <CancelIcon style={{cursor:'pointer', color: '#838383', padding: '0px 8px',height: 18,width:"auto"}}className='cancelIcon' onClick={cancelEdit} />
            </span>
          ) : (
            <span className='JsonValue' onClick={showEditInput}>
              {currentValue}
            </span>
          )}
        </span>
        <span>"</span>
      </span>
    </div>
  );
};

export default JsonString;
