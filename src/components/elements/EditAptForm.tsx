import React, { useState } from "react";
import './NewAptForm.css';
import { CurrencyInput } from "./CurrencyInput";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const NewAptForm = () => {

  // Get maps: https://visgl.github.io/react-google-maps/docs/get-started
  // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
  // More maps examples: https://dev.to/aneeqakhan/how-to-add-google-maps-to-your-web-app-using-react-3c3e

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
  const [xcoord, setXcoord] = useState("");
  const [ycoord, setYcoord] = useState("");
  const [link, setLink] = useState("");
  const [sale, setSale] = useState("");
  const [saleCurrency, setSaleCurrency] = useState("mxn");
  const [mtnExp, setMtnExp] = useState("");
  const [mtnExpCurrency, setMtnExpCurrency] = useState("mxn");
  const [mtnAm, setMtnAm] = useState("");
  const [mtnAmCurrency, setMtnAmCurrency] = useState("mxn");

  const [unit, setUnit] = useState("depto");
  const [status, setStatus] = useState("preventa");
  const [finish, setFinish] = useState("acabados");
  const [duedate, setDuedate] = useState<Date|null>(new Date());

  const [ant, setAnt] = useState("");

  const [showroom, setShowroom] = useState(false);
  const [total, setTotal] = useState("");
  const [notes, setNotes] = useState("");

  const [sqm, setSqm] = useState("");
  const [totalsqm, setTotalsqm] = useState("");

  const [storage, setStorage] = useState("");
  const [service, setService] = useState("");

  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const [parking, setParking] = useState("");
  const [parktype, setParktype] = useState("");

  const [furnished, setFurnished] = useState(false);

  return (<div className="newapt-container">
    <form className="newapt-form">
      <fieldset className="section form-address">
        <legend className="section-legend">Ubicacion</legend>
        <div className="section-form">
          <div className="newapt-form-row">
            <div className="field medium">
              <label htmlFor="name" >Nombre</label>
              <input
                className="long-input input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="field medium">
              <label htmlFor="building">Edificio</label>
              <input
                className="short-input input"
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
                className="short-input input"
                id="building"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Building"
              />
            </div>
            <div className="field short">
              <label htmlFor="exterior">Exterior</label>
              <input
                className="short-input input"
                id="exterior"
                value={exterior}
                onChange={(e) => setExterior(e.target.value)}
                placeholder="Exterior"
              />
            </div>
            
            <div className="field short">
              <label htmlFor="">Interior</label>
              <input
                className="short-input input"
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
                className="long-input input"
                id="suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Suburb"
              />
            </div>
            <div className="field">
              <label htmlFor="municipality" >Delegacion (Municipio)</label>
              <input
                className="long-input input"
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
                className="long-input input"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="field">
              <label htmlFor="province">Estado (Provincia)</label>
              <input
                className="short-input input"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
              />
            </div>
            <div className="field short">
              <label htmlFor="zip">CP</label>
              <input
                className="short-input input"
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
                className="long-input input"
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
                className="short-input input"
                id="xcoord"
                value={xcoord}
                onChange={(e) => setXcoord(e.target.value)}
                placeholder="X"
              />
            </div>
            <div className="field">
              <label htmlFor="ycoord">Coords: Y</label>
              <input
                className="short-input input"
                id="ycoord"
                value={ycoord}
                onChange={(e) => setYcoord(e.target.value)}
                placeholder="Y"
              />
            </div>
          </div>
        </div>
      
        <div className="map">

        </div>
      </fieldset>

      <fieldset className="section form-pricing">
        <legend className="section-legend">Precio</legend>
        <div className="section-form">
          <div className="newapt-form-row">
            
            <div className="inline-field">
              <label htmlFor="sale">Venta</label>
              <select
                value={saleCurrency}
                onChange={(e) => setSaleCurrency(e.target.value)}
                className="">
                <option value="mxn">MXN</option>
                <option value="usd">USD</option>
              </select>
              <CurrencyInput
                id="sale"
                value={sale}
                onChange={(s: string) => { setSale(s)}}
              />
            </div>
          </div>

          <div className="newapt-form-row">

            <div className="inline-field">
              <label htmlFor="mtnExp">Mantenimiento</label>
              <select
                value={mtnExpCurrency}
                onChange={(e) => setMtnExpCurrency(e.target.value)}
                className="">
                <option value="mxn">MXN</option>
                <option value="usd">USD</option>
              </select>
              <CurrencyInput
                id="mtnExp"
                value={mtnExp}
                onChange={(s: string) => setMtnExp(s)}
              />
            </div>

          </div>

          <div className="newapt-form-row">

            <div className="inline-field">
              <label htmlFor="mtnAm">Amenidades</label>
              <select
                value={mtnAmCurrency}
                onChange={(e) => setMtnAmCurrency(e.target.value)}
                className="">
                <option value="mxn">MXN</option>
                <option value="usd">USD</option>
              </select>
              <CurrencyInput
                id="mtnAm"
                value={mtnAm}
                onChange={(s: string) => setMtnAm(s)}
              />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="section form-features">
        <legend className="section-legend">Caracteristicas</legend>
        <div className="section-form">
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="">Unidad</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="">
                <option value="depto">Departamento</option>
                <option value="casa">Casa</option>
              </select>
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field-s">
              <label>Entrega</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="">
                <option value="preventa">Preventa</option>
                <option value="inmediata">Inmediata</option>
              </select>
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field-s">
              <label>Acabados</label>
              <select
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="">
                <option value="acabados">Con acabados</option>
                <option value="obrablanca">Obra Blanca</option>
              </select>
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="duedate">Disponibilidad</label>
              {/* <input
                className=""
                id="duedate"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                placeholder="Due date"
              /> */}
              <DatePicker selected={duedate} onChange={(date) => setDuedate(date)}/>
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="ant">Establecido</label>
              <input
                className=""
                id="ant"
                value={ant}
                onChange={(e) => setAnt(e.target.value)}
                placeholder="Establecido"
              />
            </div>
          </div>


          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="">Cuarto muestra</label>
              <select
                value={showroom ? 'true' : 'false'}
                onChange={(e) => setShowroom(e.target.value === 'true' ? true : false)}
                className="">
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
              {/* <input type="checkbox" onChange={(e) => setShowroom(e.target.checked)} checked={showroom} className="checkbox"/> */}
            </div>
          </div>
          <div className="newapt-form-row">

            <div className="field-s">
              <label htmlFor="">Total unidades</label>
              <input className="" id="" value={total} onChange={(e) => setTotal(e.target.value)} />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field">
              <label>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="sqm">Mts&#178; Habitable</label>
              <input className="" id="sqm" value={sqm} onChange={(e) => setSqm(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="totalsqm">Mts&#178; Total</label>
              <input className="" id="totalsqm" value={totalsqm} onChange={(e) => setTotalsqm(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="storage">Almacenamiento</label>
              <input className="" id="storage" value={storage} onChange={(e) => setStorage(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="servicio">Cuartos servicio</label>
              <input className="" id="servicio" value={service} onChange={(e) => setService(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="rooms">Cuartos</label>
              <input className="" id="rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="bath">Ba&ntilde;os</label>
              <input className="" id="bath" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="parking">Estacionamiento</label>
              <input className="" id="parking" value={parking} onChange={(e) => setParking(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="parktype">Tipo Estacionamiento</label>
              <input className="" id="parktype" value={parktype} onChange={(e) => setParktype(e.target.value)} />
            </div>
          </div>
          <div className="newapt-form-row">
            <div className="field-s">
              <label htmlFor="">Amueblado</label>
              <select
                value={furnished ? 'true' : 'false'}
                onChange={(e) => setFurnished(e.target.value === 'true' ? true : false)}
                className="">
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
              {/* <input type="checkbox" onChange={(e) => setShowroom(e.target.checked)} checked={showroom} className="checkbox"/> */}
            </div>
          </div>
          <div className="newapt-form-row"></div>
        </div>
      </fieldset>
      
    </form>
  </div>);
};