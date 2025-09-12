import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CurrencyInput } from "../CurrencyInput";

import "react-datepicker/dist/react-datepicker.css";
import { Toggle } from "../Toggle";

type Props = {
  initialData: any;
  onComplete: (data: any) => void;
};


export const ListingStep = ({ initialData, onComplete }: Props) => {

  const [ price, setPrice ] = useState(initialData.sale?.rooms || 0);
  const [ available, setAvailable ] = useState(initialData.sale?.available || '');
  const [ forSale, setForSale ] =useState(initialData.forSale || false);

  const validate = () => {
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      const saleData = {
        sale: {
          price,
          available
        },
        forSale
      }
      onComplete(saleData);
    }
  }
  return (<>
  <div className="appform">
  <div className="row">
      <div className="notifications">{}</div>
      <button style={{marginLeft: 'auto', marginRight: '2.5rem'}} className="btn-primary" type='button' onClick={handleNext}>Siguiente</button>
    </div>

    <div className="row-spaced row">
      <div className="field">
        <label>Precio Venta</label>
        <CurrencyInput
          value={price}
          onChange={(e) => setPrice(e)}
        />
      </div>
      <div className="field">
        <label>Disponibilidad</label>
      <DatePicker selected={available} onChange={(date) => setAvailable(date)} />
      </div>
      <div className="field shrink">
        {/* toggle for listing */}
        <label>Publicar</label>
        <Toggle
          id="notifications"
          checked={forSale}
          onChange={setForSale}
        />
        {/* <div className="slider switch">
          <input onChange={(_)=>setForSale(!forSale)} id="sale_availability" type="checkbox" checked={forSale} />
          <span className="slider round"></span>
        </div> */}
      </div>
    </div>

    <div className="row">
      
    </div>
  </div>
  </>);
}