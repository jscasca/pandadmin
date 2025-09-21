import React from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PropertyGrid } from "../../../elements/PropertyGrid";
// import { SortableTable } from "../../../elements/SortableTable";
// import { timeFromSpanish } from "../../../Util";
// import { SearchableTable } from "../../../elements/SearchableTable";
// import { PropertyTable } from "./PropertyTable";

export const Properties = () => {

  console.log('Property home');
  const navigate = useNavigate();

  // const { user } = useContext(AuthContext);
  // const developments = [
  //   { name: 'Nombre', property: 'name' },
  //   { name: 'Exterior', property: 'exterior'},
  //   { name: 'Calle', property: 'street' },
  //   { name: 'Exterior', property: 'interior'},
  //   { name: 'Colonia', property: 'suburb' },
  //   { name: 'Actualizado', property: 'updatedAt', converter: (v: any) => {
  //     console.log(v);
  //     const timeDiff = timeFromSpanish(Date.parse(v), Date.now());
  //     return timeDiff
  //   }}
  // ]

  return (
    <>
    <h1>Propiedades</h1>
    {/* <div className="">
      <a href="/inventory/properties/new">Agregar Propiedad</a>
    </div> */}
    <div className="section_header">
      <button onClick={()=>navigate('/inventory/properties/new')}>Nueva Propiedad <MdAdd /></button>
    </div>
      <div>
        {/* <PropertyTable /> */}
        {/* <SearchableTable fetchUrl="/inventory/properties" /> */}
        {/* <SortableTable
          navigation='/inventory/properties/'
          fetchUrl="/inventory/properties"
          columns={developments}
          /> */}
          <PropertyGrid />
      </div>
    </>
  );
}