import React, { useEffect, useState } from 'react';
import ToggleIcon from '@material-ui/icons/PlayCircleFilled';
// import  ToggleIcon  from 'caret-square-right-solid.svg';
import DataTypes from './dataTypes/DataTypes';
import { getTypes } from './dataTypes/getTypes';
interface DetailState{
  data?:{[key:string]:any}|undefined,
  onEdit:(newValue:any,key:string|number)=>void,
  onDelete:(key:number|string)=>void,
}
const DataView:React.FC<DetailState> = ({ data, onDelete, onEdit }:DetailState) => {
  const [col, setCol] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<DetailState["data"]>({});
  useEffect(() => {
    let newkeys:string[]|undefined=Object.getOwnPropertyNames(data);
    setKeys(newkeys);
    setCurrentData(data);
  }, [data]);

  const toggleJsonView = ():void => {
    setCol(!col);
  };

  const renderData = () => {
    if (col)
      return (
        <div className='p5'>
          <span className='colorGray'>
            <span>{'{'}</span>
            {currentData?Object.keys(currentData).length:""} items<span>{'}'}</span>
          </span>
        </div>
      );
    return keys.map((k) => {
      return (
        <div key={k}>
          <DataTypes
            key={k}
            dataType={currentData?getTypes(currentData[k]):""}
            dataValue={currentData?currentData[k]:""}
            dataKey={k}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      );
    });
  };
  return (
    <div className='JsonTree'>
      <div>
      {/* <img src={ToggleIcon} alt="logo" onClick={toggleJsonView}/> */}
        
        <ToggleIcon onClick={toggleJsonView} className='mainCollapseIcon' />
        "root" :<span className='boldStyle pl5'>{'{'}</span>
        {renderData()}
        <div className='boldStyle '>{'}'}</div>
      </div>
    </div>
  );
};

export default DataView;
