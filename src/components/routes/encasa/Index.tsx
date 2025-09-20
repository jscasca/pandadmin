import React from "react";
import { useNavigate } from "react-router-dom";
// import { MapView } from "../../elements/MapView";
// import { PropertiesMap } from "./PropertiesMap";


export const EncasaIndex = () => {
  const navigate = useNavigate();
  console.log(navigate);

  return (
    <>
    <div className="encasa">
      <h1>EnCasa API</h1>

      <div className="section-container">
        {/* <MapView /> */}
        {/* <PropertiesMap /> */}
      </div>
    </div>
    </>
  );
}