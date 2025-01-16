import React, { useEffect, useState } from "react";

import {
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdOutlineLayers,
  MdDesk
} from "react-icons/md";

type Props = {
  data: any;
  onSave: () => void;
};

export const FeatureFieldSet = ({ data, onSave }: Props) => {

  const [ rooms, setRooms ] = useState('');
  const [ bathrooms, setBathRooms ] = useState('');
  const [ parking, setParking ] = useState('');
  const [ sqft, setSqft ] = useState('');

  const [ parktype, setParktype ] = useState('');
  const [ furnished, setFurnished ] = useState('');

  /*
            sqm: {}, // superficie o square meter
    storage: {}, // Bodega o similar
    serviceroom: {}, // Cuarto de servicio
    antiquity: {}, //antiguedad
    rooms: {},
    bathrooms: {},
    furnished: {},
    parking: {},
    parkingtype: {},
    */

  console.log(onSave);

  useEffect(() => {
    console.log('load data', data);
  }, [data]);

  return (<>
    <div className="form-edit">
      <h2>Caracteristicas</h2>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="rooms">Cuartos</label>
          <input id="rooms" value={rooms} type="number" onChange={(e) => setRooms(e.target.value)} placeholder="Cuartos" />
          <MdBed />
        </div>

        <div className="form-field">
          <label htmlFor="baths">Ba&ntilde;os</label>
          <input id="baths" value={bathrooms} onChange={(e) => setBathRooms(e.target.value)} />
          <MdBathtub />
        </div>
      </div>

      <div className="form-row">
        <div className="">
          <label htmlFor="parking">Estacionamiento</label>
          <input id="parking" value={parking} onChange={(e) => setParking(e.target.value)} />
          <MdDirectionsCar/>
        </div>
        <div className="form-field">
          <label htmlFor="parktype">Tipo</label>
          <input id="parktype" value={parktype} onChange={(e) => setParktype(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="sqft">Mts Cuadrados</label>
          <input id="sqft" value={sqft} onChange={(e) => setSqft(e.target.value)} />
          <MdOutlineLayers/>
        </div>
        <div className="form-field">
          <label htmlFor="parking">Amueblado</label>
          <input id="parking" value={furnished} onChange={(e) => setFurnished(e.target.value)} />
          <MdDesk/>
        </div>
      </div>

    </div>
  </>);
}