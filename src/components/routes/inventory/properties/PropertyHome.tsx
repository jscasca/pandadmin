import React from "react";
import { SortableTable } from "../../../elements/SortableTable";

export const Properties = () => {

  console.log('Property home');
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);
  const developments = [
    { name: 'Nombre', property: 'name' },
    { name: 'Exterior', property: 'exterior'},
    { name: 'Calle', property: 'street' },
    { name: 'Exterior', property: 'interior'},
    { name: 'Colonia', property: 'suburb' },
    { name: 'Actualizado', property: 'updatedAt'}
  ]

  return (
    <>
      <div id="sidebar">
        <h1>Properties</h1>
      </div>
      <div>
        <SortableTable
          navigation='/inventory/properties/'
          fetchUrl="/inventory/properties"
          columns={developments}
          />
      </div>
    </>
  );
}