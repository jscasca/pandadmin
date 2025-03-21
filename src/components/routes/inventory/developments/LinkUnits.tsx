import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../AxiosContext";
import React from "react";
import { PropertyCard } from "./Development";

type Props = {
  development: any,
  onSave: (units: any[]) => void;
};

export const LinkUnits = ({ development, onSave }: Props) => {

  const { authAxios } = useContext(AxiosContext);

  const [units, setUnits] = useState<any[]>([]);

  const [ saveable, setSaveable ] = useState(true);

  const toggleUnitSelection = (index: number) => {
    setUnits(units.map((u: any, i) => {
      return i === index ? {selected: !u.selected, unit: u.unit}:u;
    }));
  };

  useEffect(() => {
    if (development) {
      const params = {
        filters: { $and: [
          { $or: [{address: development.address}, {development: development.name}]},
          { _id: { $nin: development.listings.map((u: any) => u._id) } }
        ]},
        projection: 'street exterior interior building suburb rooms bathrooms parking sqft'
        // projection: { street: 1, suburb: 1, rooms: 1, bathrooms: 1, parking: 1, sqft: 1}
      };
      const fetchUnits = async() => {
        const unitsReq = await authAxios.get('/inventory/properties', { params });
        const units = unitsReq.data.data;
        setUnits(units.map((u: any) => { return {selected: false, unit: u}}));
      }
      // then fetch
      fetchUnits();
      setSaveable(true);
    }
  }, [development, authAxios]);

  const handleSave = () => {
    const listings = units.filter(u => u.selected).map(u => u.unit._id);
    setSaveable(false);
    onSave(listings);
  };

  return(<>
    { units.length > 0 ? <div className="link-units">
      <h3>Unidad relacionadas</h3>
      <div className="units">
      { units.map((u, i) => {
        return (<PropertyCard onClick={()=>toggleUnitSelection(i)} key={i} data={u.unit} selected={u.selected} />) }) }
      </div>
      <div className="form-controls">
        <button disabled={!units.some(u => u.selected) && !saveable} className="main" onClick={() => handleSave()}>Enlazar Unidades</button>
      </div>
    </div> : <></>}
  </>);
};