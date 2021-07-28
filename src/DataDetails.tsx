import React, { useEffect, useState } from 'react';
import ToggleIcon from '@material-ui/icons/PlayCircleFilled';
import DataTypes from './dataTypes/DataTypes';
import { getTypes } from './dataTypes/getTypes';
import FileCopyIcon from '@material-ui/icons/FileCopy';
interface DetailState{
  data?:{[key:string]:any}|undefined,
  onEdit:(newValue:any,key:string|number)=>void,
  onDelete:(key:number|string)=>void,
}
const DataView:React.FC<DetailState> = ({ data, onDelete, onEdit }:DetailState) => {
  const [col, setCol] = useState(false);
  const [message,setMessage]=useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<DetailState["data"]>({});
  useEffect(() => {
    let newkeys:string[]|undefined=Object.getOwnPropertyNames(data);
    setKeys(newkeys);
    setCurrentData(data);
  }, [data]);
  const copyDataToClipboard = ():void => {
    navigator.clipboard.writeText(JSON.stringify(data));
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };
  const toggleJsonView = ():void => {
    setCol(!col);
  };
  const renderMessage=()=>{
    if(message){
      return(
        <div><span style={{fontWeight:"bold",padding:6,background:"#e5e5e5de"}}>Copied!</span></div>
      )
    }else{
      return;
    }
    
  }
  const renderData = () => {
    if (col)
      return (
        <div style={{padding:5}}>
          <span style={{color:"gray"}}>
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
        {renderMessage()}
        <ToggleIcon onClick={toggleJsonView} className='mainCollapseIcon' style={{cursor: 'pointer',height: 16,color: '#525252',marginTop: 5}}/>
        "root" :<span style={{fontWeight:"bold",paddingLeft:5}}>{'{'}
        <FileCopyIcon
              style={{ fontSize: 16, color: 'gray', cursor: 'pointer' }}
              onClick={copyDataToClipboard}
            />
        </span>
        {renderData()}
        <div style={{fontWeight:"bold"}}>{'}'}</div>
      </div>
    </div>
  );
};

export default DataView;
