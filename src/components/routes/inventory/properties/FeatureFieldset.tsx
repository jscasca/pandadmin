import React, { useEffect, useState } from "react";

import {
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdOutlineLayers,
  MdDesk
} from "react-icons/md";

import './FeatureFieldSet.css';

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

  const parktypes = ['Bateria', 'Vecino'];

  return (<>
    <div className="form-edit">
      <h2>Caracteristicas</h2>
      <div className="form-row main-feature-row">
        <div className="form-field">
          <label htmlFor="rooms">Cuartos</label>
          <div className="field">
            <input id="rooms" value={rooms} type="number" onChange={(e) => setRooms(e.target.value)} placeholder="0" />
            <MdBed />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="baths">Ba&ntilde;os</label>
          <div className="field">
          <input id="baths" value={bathrooms} type="number" onChange={(e) => setBathRooms(e.target.value)} placeholder="0" />
          <MdBathtub /></div>
        </div>

        <div className="form-field">
          <label htmlFor="parking">Estacionamiento</label>
          <div className="field">
          <input id="parking" value={parking} type="number" onChange={(e) => setParking(e.target.value)} placeholder="0" />
          <MdDirectionsCar/></div>
        </div>

        <div className="form-field">
          <label htmlFor="sqft">Mts Cuadrados</label>
          <div className="field">
          <input id="sqft" value={sqft} type="number" onChange={(e) => setSqft(e.target.value)} placeholder="0" />
          <MdOutlineLayers/></div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="parktype">Estacionamiento</label>
          <input disabled={!(parking.length > 0 && Number(parking) > 0)} list="parktypes" id="parktype" value={parktype} onChange={(e) => setParktype(e.target.value)} />
          <datalist id="parktypes">
            {parktypes.map((v) => (<option key={v} value={v}/>))}
          </datalist>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="parking">Amueblado</label>
          <input id="parking" value={furnished} onChange={(e) => setFurnished(e.target.value)} />
          <MdDesk/>
        </div>
      </div>

      <div className="form-row">
        {/* Tag based amenities */}
      </div>

      <div className="form-controls">
        <button className="main">Guardar</button>
        <button>Cancelar</button>
      </div>

    </div>
  </>);
}