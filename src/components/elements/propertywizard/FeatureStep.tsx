import React, { useRef, useState } from "react";

import {
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdOutlineLayers,
  MdOutlineClose,
} from "react-icons/md";
import { Tiptap } from "../editor/Tiptap";

type Props = {
  initialData: any;
  onComplete: (data: any) => void;
};

const commonAmenities = [
  'Alberca', 'Cinema', 'Coworking', 'Gym'
];


export const FeatureStep = ({ initialData, onComplete }: Props) => {

  const [ rooms, setRooms ] = useState(initialData.rooms || 0);
  const [ bathrooms, setBathrooms ] = useState(initialData.bathrooms || 0);
  const [ parking, setParking ] = useState(initialData.parking || 0);
  const [ sqft, setSqft ] = useState(initialData.sqft || 0);
  // const [ parktype, setParktype ] = useState(initialData.parktype || '')
  const [ roomError, setRoomError ] = useState(false);
  const [ bathError, setBathError ] = useState(false);
  const [ sqftError, setSqftError ] = useState(false);

  const [ amenities, setAmenities ] = useState(initialData.amenities || []);

  const [ description, setDescription ] = useState(initialData.description || '');

  const validate = () => {
    let errors = false;
    if (!rooms || rooms < 1) {
      setRoomError(true);
      errors = true;
    }
    if (!bathrooms || rooms < 1) {
      setBathError(true);
      errors = true;
    }
    if (!sqft || sqft < 1) {
      setSqftError(true);
      errors = true;
    };
    return !errors;
  };

  const handleNext = () => {
    if (validate()) {
      const featureData = {
        rooms,
        bathrooms,
        sqft,
        parking,
        amenities,
        description
      }
      onComplete(featureData);
    }
  }
  return (<>
  <div className="appform">

    <div className="row">
      <div className="notifications">{}</div>
      <button style={{marginLeft: 'auto', marginRight: '2.5rem'}} className="btn-primary" type='button' onClick={handleNext}>Next</button>
    </div>

    <div className="row-spaced">
      <div className="icon-field">
        <label>
          <MdBed />
          <span>Rooms</span>
        </label>
        <input
        className={roomError ? 'error' : ''}
        value={rooms}
        onChange={(e) => {setRooms(e.target.value); if (parseInt(e.target.value) > 0) setRoomError(false);}}
        type="number" min="0" max="9"/>
      </div>
      <div className="icon-field">
        <label>
          <MdBathtub />
          <span>Bathrooms</span>
        </label>
        <input
        className={bathError ? 'error' : ''}
        value={bathrooms}
        onChange={(e) => {setBathrooms(e.target.value); if (parseInt(e.target.value) > 0) setBathError(false);}}
        type="number" min="0" max="9" />
      </div>
      <div className="icon-field">
        <label>
          <MdDirectionsCar />
          <span>Parking</span>
        </label>
        <input
        value={parking}
        onChange={(e) => setParking(e.target.value)}
        type="number" min="0" max="9" />
      </div>
      <div className="icon-field">
        <label>
          <MdOutlineLayers />
          <span>Square ft</span>
        </label>
        <input
        className={sqftError ? 'error' : ''}
        value={sqft}
        onChange={(e) => {setSqft(e.target.value); if (parseInt(e.target.value) > 0) setSqftError(false);} }
        type="number" min="0" max="9" />
      </div>
    </div>

    <div className="row">
      <Amenities amenities={amenities} datalist={commonAmenities} onChange={v => setAmenities(v)}/>

    </div>

    <div className="row">
      <Tiptap content={description} setContent={(c) => setDescription(c)} />
    </div>
  </div>
  </>);
};

export type AmenitiesProps = {
  datalist?: string[];
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

export const Amenities = ({ datalist, amenities, onChange }: AmenitiesProps) => {
  // const [ amenities, setAmenities ] = useState();

  const [ input, setInput ] = useState('');
  const lastTyped = useRef("");

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const addAmenityTag = (tag: string) => {
    const normalized = capitalize(tag.trim());
    if (normalized && !amenities.includes(tag)) {
      onChange([...amenities, normalized]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInput(newVal);

    if (datalist?.includes(newVal)) {
      addAmenityTag(newVal);
      setInput('');
    }

    // Always update lastTyped for reference
    lastTyped.current = newVal;
  };

  const keyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAmenityTag(e.target.value);
      setInput('');
    }
  }

  const removeTag = (tag: string) => {
    onChange(amenities.filter(t => t !== tag));
  }

  return (<>
  <fieldset className="fs-amenities">
    <legend>Amenidades</legend>
    <div className="amenities field">
      <div className="tag-space">
        { amenities.map((tag) => (<button onClick={() => removeTag(tag)} className="amenity-tag" title="" key={tag} ><span>{tag}</span><MdOutlineClose /></button>)) }
      </div>
      <input
        list='amenities'
        autoComplete="off"
        autoCorrect="off"
        value={input}
        onKeyDown={keyDown}
        onChange={handleChange} />
      <datalist id='amenities'>
        { datalist && datalist.map((v) => (<option key={v} value={v}/>))}
      </datalist>
    </div>
  </fieldset>
  </>)
};