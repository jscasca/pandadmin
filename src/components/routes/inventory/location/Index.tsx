import React from "react";
import { SortableTable } from "../../../elements/SortableTable";

export const InventoryLocationHome = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  const developments = [
    {name: 'Nombre', property: 'name'},
    {name: 'Estado', property: 'province'},
    {name: 'Ciudad', property: 'city'},
    {name: 'Colonia', property: 'suburb'},
    {name: 'Unidades', property: 'listings', converter: (v: any) => Array.isArray(v) ? v.length : 0},

  ]
  return (
    <>
      <div id="sidebar">
        <h1>Ubicaciones</h1>
      </div>
      <div id="detail">
        <a className="home-link" href="/inventory/location/new">
          <div className="linked-div">
            Nueva
          </div>
        </a>
      </div>
      <div>
        Existing developments
        <SortableTable navigation="/inventory/developments/" fetchUrl='/inventory/developments' columns={developments} />
      </div>
      <div>
        Existing locations
      </div>
    </>
  );
}