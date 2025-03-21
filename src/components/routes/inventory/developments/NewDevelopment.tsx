import React, { useContext, useState } from "react";
import './NewDevelopment.css';

import * as CONST from '../../../../Constants';

import {
  APIProvider,
  AdvancedMarker,
  Map,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { AxiosContext } from "../../../AxiosContext";
import { useNavigate } from "react-router-dom";
import { GmapsAutocomplete } from "../../../elements/GmapsAutocomplete";
import { GmapsMapHandler } from "../../../elements/GmapsMapHandler";
import { MdHomeWork } from "react-icons/md";
export const NewDevelopment = () => {

  const navigate = useNavigate();
  const { authAxios } = useContext(AxiosContext);

  const [name, setName] = useState("");
  const [exterior, setExterior] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState(""); // localizacion o colonia, vecindario, manzana o cuadra
  const [municipality, setMunicipality] = useState(""); // Provincia o Delegacion o municipio
  const [city, setCity] = useState(""); // Ciudad
  const [province, setProvince] = useState(""); // Estado
  const [zip, setZip] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [link, setLink] = useState("");

  
  const [ selectedPlace, setSelectedPlace ] = useState<any>(null);
  const [ markerRef, marker ] = useAdvancedMarkerRef();
  const [ isLoading, setLoading ] = useState(false);
  const mapCenter = { lat: 19.43145883973556, lng: -99.13194980120416 };

  const getPlace = (place: any) => {
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      console.log(component);
      const componentType = component.types[0];
      switch (componentType) {
        case 'street_number': { setExterior(component.long_name); break; }
        case 'route': { setStreet(component.long_name); break; }
        case 'sublocality_level_1': { setSuburb(component.long_name); break; }
        case 'locality': { setCity(component.long_name); break; }
        case 'administrative_area_level_1': { setProvince(component.long_name); break; }
        case 'postal_code': { setZip(component.long_name); break; }
      }
    }
    const gLat = place.geometry.location.lat();
    const gLng = place.geometry.location.lng();
    console.log("location: ", place.geometry.location);
    console.log(gLat, gLng);
    if (gLat && gLng) {
      setLat(gLat);
      setLng(gLng);
      setLink(`https://www.google.com/maps/search/?api=1&query=${gLat},${gLng}`);
    }
    setSelectedPlace(place);
  };

  const saveDevelopment = async (ev: any) => {
    ev.preventDefault();
    console.log('saving new...');
    setLoading(true);
    const newDevelopment = {
      name,
      street,
      exterior,
      suburb,
      municipality,
      city,
      province,
      zip,
      lat,
      lng,
      link
    };
    try {
      console.log('saving development: ', newDevelopment);
      const response = await authAxios.put('inventory/developments', newDevelopment);
      if (response.data.error) {
        // show error
        console.error(response.data.error);
      } else {
        // navigation
        const development = response.data.data;
        console.log('navioghating to: ', development);
        navigate(`/inventory/developments/${development._id}`, development);
      }
    } catch(e) {
      // display error
      setLoading(false);
    }
  };

  const reset = (ev: any) => {
    ev.preventDefault();
    setName('');
    setStreet("");
    setExterior("");
    setSuburb("");
    setMunicipality("");
    setCity("");
    setProvince("");
    setZip("");
    setLink("");
    setLat("");
    setLng("");
  };

  return (<>
    <div className="newdev-container">
      <h2><MdHomeWork /> Nuevo Desarrollo</h2>
      {/* <div onClick={() => setLoading(!isLoading)}>Loading...</div> */}
      <form className="newdev-form">
        <fieldset className="section newdev-address">
          <div className="newdev-section">
            {/* Development name */}
            <div className="newdev-form-row">
              <div className="field long">
                <label htmlFor="name">Nombre</label>
                <input
                  className={name ? "" : "empty"}
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre"
                />
              </div>
            </div>

            {/* Map autocompleter */}
            <div className="newdev-form-row">
              <div className="field">
                <label>Direccion</label>
                <APIProvider apiKey={CONST.MAP_API}>
                  <GmapsAutocomplete onPlaceSelect={getPlace} placeholder="Direccion" />
                </APIProvider>
              </div>
            </div>

            {/* Address: Calle, exterior */}
            <div className="newdev-form-row">
              <div className="field long">
                <label htmlFor="street">Calle</label>
                <input
                  className={street ? "" : "empty"}
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street"
                />
              </div>
              <div className="field short">
                <label htmlFor="exterior">Exterior</label>
                <input
                  className={exterior ? "" : "empty"}
                  id="exterior"
                  value={exterior}
                  onChange={(e) => setExterior(e.target.value)}
                  placeholder="Exterior"
                />
              </div>
            </div>
            {/* Address: Suburb, Municipality */}
            <div className="newdev-form-row">
              <div className="field">
                <label htmlFor="suburb" >Colonia (Suburbio)</label>
                <input
                  className={suburb ? "" : "empty"}
                  id="suburb"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="Suburb"
                />
              </div>
              <div className="field">
                <label htmlFor="municipality" >Delegacion (Municipio)</label>
                <input
                  className={municipality ? "" : "empty"}
                  id="municipality"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  placeholder="Municipality"
                />
              </div>
            </div>
            {/* Address: City, State, Zip */}
            <div className="newdev-form-row">
              <div className="field">
                <label htmlFor="city" >Ciudad</label>
                <input
                  className={city ? "" : "empty"}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="field">
                <label htmlFor="province">Estado (Provincia)</label>
                <input
                  className={province ? "" : "empty"}
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  placeholder="Province"
                />
              </div>
              <div className="field short">
                <label htmlFor="zip">CP</label>
                <input
                  className={zip ? "" : "empty"}
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="Zip"
                />
              </div>
            </div>
            {/* Address: Gmap link */}
            <div className="newdev-form-row">
              <div className="field">
                <label htmlFor="link" >Google maps</label>
                <input
                  className={link ? "" : "empty"}
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Gmaps link"
                />
              </div>
            </div>
            {/* Address: Lat, Lng */}
            <div className="newdev-form-row">
              <div className="field">
                <label htmlFor="xcoord">Coords: X</label>
                <input
                  className={lat ? "" : "empty"}
                  id="xcoord"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="X"
                />
              </div>
              <div className="field">
                <label htmlFor="ycoord">Coords: Y</label>
                <input
                  className={lng ? "" : "empty"}
                  id="ycoord"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="Y"
                />
              </div>
            </div>
          </div>

          <div className="newdev-map">
            <APIProvider apiKey={CONST.MAP_API}>
              <Map
                reuseMaps={true}
                mapId='TEST_MAP'
                style={{width: '600px', height: '380px'}}
                defaultZoom={13}
                defaultCenter={mapCenter}>
                <AdvancedMarker ref={markerRef} position={null} />
              </Map>
              <GmapsMapHandler place={selectedPlace} marker={marker} />
            </APIProvider>
          </div>

          <div className="form-controls">
            <button
              className="main"
              disabled={isLoading}
              onClick={saveDevelopment}
            >{ isLoading ? <img src='/loading-gif.gif' alt='loading...' /> : 'Guardar'}</button>
            <button onClick={reset}>Cancelar</button>
          </div>
        </fieldset>
      </form>
    </div>
  </>);
};