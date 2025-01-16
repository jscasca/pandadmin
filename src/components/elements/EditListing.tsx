import React, { useContext, useEffect, useState } from "react";
import './NewAptForm.css';

import { AxiosContext } from "../AxiosContext";
import { useNavigate } from "react-router-dom";

type Props = {
  listingId: string|undefined;
  listingData: any;
}

export const EditListing = ({listingId, listingData}: Props) => {
  console.log(listingId, listingData);

  const navigate = useNavigate();

  const { authAxios } = useContext(AxiosContext);

  const [ fetching, setFetching ] = useState<boolean>(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (listingId === undefined) {
      return;
    }
    const fetch = async (id: string) => {
      setFetching(true);
      console.log('fetching...'); 
      const result = await authAxios.get(`/listings/${id}`);
      console.log('result: ', result.data);
      setFetching(false);
    };
    console.log('passed state: ', listingData);
    if (listingData) {
      console.log('state data:', listingData);
    } else {
      fetch(listingId);
    }
  }, [ listingData, listingId, authAxios ]);

  const [devType, setDevType] = useState("DEPTO"); // DEPTO | CASA

  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [interior, setInterior] = useState("");
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

  const [isLoading, setLoading ] = useState(false);

  const saveForm = () => {
    setLoading(true);
    console.log(authAxios);
    navigate('/');
  };
  const reset = () => {}

  return (<div className="newapt-container">
    <form className="newapt-form">
      <fieldset className="section form-address">
        <legend className="section-legend">Agregar Ubicacion</legend>
        <div className="section-form">
          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="name" >Nombre</label>
              <select
                id="residency"
                value={devType}
                onChange={(e) => setDevType(e.target.value)}
                className="">
                <option value="CASA">Casa</option>
                <option value="DEPTO">Departamento</option>
              </select>
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field medium">
              <label htmlFor="name" >Nombre</label>
              <input
                className={name ? "" : "empty"}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="field medium">
              <label htmlFor="building">Edificio</label>
              <input
                className={building ? "" : "empty"}
                id="building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="Building"
              />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field long">
              <label htmlFor="">Calle</label>
              <input
                className={street ? "" : "empty"}
                id="building"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Building"
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
            
            <div className="field short">
              <label htmlFor="">Interior</label>
              <input
                className={interior ? "" : "empty"}
                id="interior"
                value={interior}
                onChange={(e) => setInterior(e.target.value)}
                placeholder="Interior"
              />
            </div>
          </div>

          <div className="newapt-form-row">
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

          <div className="newapt-form-row">
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

          <div className="newapt-form-row">
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

          <div className="newapt-form-row">
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

        <div className="newapt-controls">
          <button className="main" onClick={saveForm}
            disabled={!(street !== '' && exterior !== '' && suburb !== '' && city !== '' && province !== '' && !isLoading)}
          >{ (isLoading || fetching) ? <img src='/loading-gif.gif' alt='loading...' /> : 'Guardar'}</button>
          <button onClick={reset}>Cancelar</button>
        </div>
      </fieldset>
      
    </form>
  </div>);
};