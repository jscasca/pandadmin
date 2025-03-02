import React, { useEffect, useState } from "react";

import {
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdOutlineLayers,
  MdOutlineClose,
} from "react-icons/md";

import './FeatureFieldSet.css';

type Props = {
  data: any;
  onSave: (data: any) => void;
};

export const FeatureFieldSet = ({ data, onSave }: Props) => {

  const [ rooms, setRooms ] = useState('');
  const [ bathrooms, setBathRooms ] = useState('');
  const [ parking, setParking ] = useState('');
  const [ sqft, setSqft ] = useState('');

  const [ amenities, setAmenities ] = useState<string[]>(['One', 'Two']);

  useEffect(() => {
    if (!data) return;
    console.log('changed data: ', data);
    if (data.rooms) setRooms(data.rooms);
    if (data.bathrooms) setBathRooms(data.bathrooms);
    if (data.parking) setParking(data.parking);
    if (data.sqft) setSqft(data.sqft);
    if (data.amenities) setAmenities(data.amenities);
  }, [data]);

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

  const handleSave = () => {
    console.log(';saving...');
    const update = {update: {
      rooms,
      bathrooms,
      parking,
      sqft,
      amenities
    }};
    console.log('saving: ', update)
    onSave(update);
  };

  const onCancel = () => {
    console.log('cancel');
  };

  const commonAmenities = [
    'Alberca',
    'Carril de Nado',
    'Cinema',
    'Coworking Space',
    'Spa',
    'Ludoteca',
    'Gimnasio',
    'Roof Garden Comun',
    'Area Infantil',
    'Areas Verdes',
    'Area para Mascotas',
    'Area Asadores',
    'Salon Usos Multiples',
    'Salon Jovenes',
    'Estacionamiento Visitas'
  ];

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

      {/* <div className="form-row">
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
      </div> */}
      {/* <div className="form-row">
        <OtherFeatures />
      </div> */}

      <div className="form-row">
        <Amenities amenities={amenities} datalist={commonAmenities} onChange={(v) => setAmenities(v)}/>
      </div>

      <div className="form-row">
        {/* Tag based amenities */}
      </div>

      <div className="form-controls">
        <button className="main" onClick={handleSave} >Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>

    </div>
  </>);
};

// type OtherFeature = {
//   name: string;
//   value: any;
// }

// const OtherFeature = () => {}

// type OtherFeaturesProps = {
//   features: OtherFeature[];
//   onChange: () => void;
// }

// const OtherFeatures = ({ features, onChange}: OtherFeaturesProps) => {

//   // const [ features, setFeatures ] = useState<OtherFeature[]>([]);

//   const [ nextFeature, setNextFeature ] = useState<any>({});

//   useEffect(() => {}, [features]);
//   return (<>
//   <div className="">
//     { features.map((f) => {
//       return <></>;
//     }) }
//   </div>
//   </>);
// };

type AmenitiesProps = {
  datalist?: string[];
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

const Amenities = ({ datalist, amenities, onChange }: AmenitiesProps) => {
  // const [ amenities, setAmenities ] = useState();

  const [ input, setInput ] = useState('');

  const addAmenityTag = (tag: string) => {
    if (!amenities.includes(tag)) {
      onChange([...amenities, tag]);
    }
  };

  const handleChange = (ev: any) => {
    const nativeEvent = ev.nativeEvent;
    // if (nativeEvent.inputType === 'insertText')
    // When selected it triggers an Event instead of an InputEvent despite type being 'InputEvent' regardless
    if (nativeEvent.inputType) {
      setInput(ev.target.value);
    } else {
      addAmenityTag(ev.target.value);
      setInput('');
    }
    
  };

  const keyUp = (ev: any) => {
    if (ev.key === 'Enter' || ev.keyCode === 13) {
      console.log('enter: ', ev.target.value);
      addAmenityTag(ev.target.value);
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    onChange(amenities.filter(t => t !== tag));
  }

  return (<>
  <div className="amenities">
    <div className="tag-space">
      { amenities.map((tag) => (<button onClick={() => removeTag(tag)} className="amenity-tag" title="" key={tag} ><span>{tag}</span><MdOutlineClose /></button>)) }
    </div>
    <input
      list='amenities'
      autoComplete="off"
      autoCorrect="off"
      placeholder="Agregar Amenidades..."
      value={input}
      onKeyUp={keyUp}
      onChange={handleChange} />
    <datalist id='amenities'>
      { datalist && datalist.map((v) => (<option key={v} value={v}/>))}
    </datalist>
  </div>
  </>)
};