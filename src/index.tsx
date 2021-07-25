import React, { useState, useEffect } from 'react';
import DataDetails from './DataDetails';

interface IState{
  resource?:{[key:string]:any}|undefined
}

const JsJsonView:React.FC<IState>= ({resource}) => {
  const [currentResource, setCurrentResource] = useState<IState["resource"]>({});
  useEffect(() => {
    setCurrentResource(resource);
  }, [resource]);

  // edit a property from the object
  const EditObj = (newValue:any, key:any):void => {
    let newObj:IState["resource"]= {...currentResource};
    newObj[key] = newValue
    setCurrentResource(newObj)
  };
  // delete a property from the object
  const DeleteObj = (key:string|number):void => {
    let currentValue:IState["resource"] = { ...currentResource };
    delete currentValue[key];
    // _.omit(currentResource, key)
    setCurrentResource(currentValue);
  };

  return (
    <div className='appContainer' data-testid='Json-tree'>
      <DataDetails
        data={currentResource}
        onDelete={DeleteObj}
        onEdit={EditObj}
      />
    </div>
  );
};

export default JsJsonView;
