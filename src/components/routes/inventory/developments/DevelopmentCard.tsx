import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

type DevelopmentProps = {
  development: any;
};

export const DevelopmentCard = ({ development }: DevelopmentProps) => {

  const [ isEdit, setEdit ] = useState(false);

  console.log(setEdit);
  return (<>
    <div className="development-card">
      {/* <button onClick={()=>setEdit(true)}>Edit</button> */}
      { isEdit ? <DevelopmentEdit data={development} /> : <DevelopmentDisplay data={development} />}
    </div>
  </>);
};

type CardProps = {
  data: any;
};
const DevelopmentDisplay = ({ data }: CardProps) => {

  const [ development, setDevelopment ] = useState<any>();
  useEffect(() => {
    if (data) {
      setDevelopment(data);
    }
  }, [data]);

  return (<>
    { development && (<div className="development-info">
      <div className="details">
        <p>{development.street} {development.exterior}</p>
        <p>{development.suburb}</p>
        <p>{development.municipality ? development.municipality + ', ': ''}{development.province}</p>
      </div>
      <div className="cover">
        <div className="img-holder">
          <img src='/no_image.jpg' alt="cover" />
          <button><MdEdit /></button>
        </div>
      </div>
    </div>)}
  </>);
};

type EditProps = {
  data: any;
};
const DevelopmentEdit = ({ data }: EditProps) => {
  console.log(data);
  return (<>
    <div className=""></div>
  </>);
};