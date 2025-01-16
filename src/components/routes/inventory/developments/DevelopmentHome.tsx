import React from "react";
import { SortableTable } from "../../../elements/SortableTable";

export const Developments = () => {

  console.log('Development home');
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);
  const developments = [
    { name: 'Nombre', property: 'name' },
    { name: 'Ciudad', property: 'city' },
    { name: 'Colonia', property: 'suburb' },
    { name: 'Unidades', property: 'listings', converter: (v: any) => Array.isArray(v) ? v.length : 0},
    { name: 'Actualizado', property: 'updatedAt'}
  ]

  return (
    <>
      <div id="sidebar">
        <h1>Developmentsssssss</h1>
      </div>
      <div>
        <SortableTable
          navigation='/inventory/developments/'
          fetchUrl="/inventory/developments"
          columns={developments}
          />
      </div>
    </>
  );
}