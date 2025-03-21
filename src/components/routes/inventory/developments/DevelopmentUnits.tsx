import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../AxiosContext";
import React from "react";
import { PropertyCard } from "./Development";
import { MdHomeWork } from "react-icons/md";

type Props = {
  listings: any[];
  onAdd?: () => void;
};

export const DevelopmentUnits = ({ listings, onAdd = ()=>{} }: Props) => {

  const { authAxios } = useContext(AxiosContext);

  const [units, setUnits] = useState<any[]>([]);

  useEffect(() => {
    console.log('displaying listings: ', listings);
    if (listings && listings.length > 0) {
      // const toFetch = listings.filter((l) => typeof l === 'string');
      // console.log('fetching for: ', toFetch);
      // const params = {
      //   filters: { '_id': { $in: toFetch } },
      //   projection: 'street exterior suburb rooms bathrooms parking sqft'
      //   // projection: { street: 1, suburb: 1, rooms: 1, bathrooms: 1, parking: 1, sqft: 1}
      // };
      // const fetchUnits = async() => {
      //   const unitsReq = await authAxios.get('/inventory/properties', { params });
      //   const fetched = unitsReq.data.data;
      //   setUnits(units.map())
      //   setUnits(units.map((u: any) => { return {selected: false, unit: u}}));
      // }
      // // then fetch
      // fetchUnits();
      setUnits(listings.map((u: any) => { return {selected: false, unit: u}}))
    }
  }, [listings, authAxios]);

  const handleAdd = () => {
    onAdd();
  };

  return(<>
  <div className="link-units" >
    <h3>Unidades en este desarrollo</h3>
    { units.length > 0 ? (<div className="units">
      { units.map((u) => {
        return (<PropertyCard key={u.unit._id} data={u.unit} />);
      })}
    </div>) : (<div className="empty-container">
      <div className="cta-div" onClick={() => handleAdd()}>
        <p>No hay unidades enlazadas a este desarrollo</p>
        <p><span><MdHomeWork /></span></p>
      </div>
    </div>)}
    <div className="form-controls">
      <button className="main" onClick={() => handleAdd()}>Agregar Unidades</button>
    </div>
  </div>
  </>);
};