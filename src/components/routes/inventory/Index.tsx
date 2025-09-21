import React from "react";
import { 
  MdAdd,
  // MdHomeWork,
  MdHouse 
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { MapView } from "../../elements/MapView";

// const DEVELOPMENTS = '/inventory/developments';
// const NEW_DEV = '/inventory/developments/new';

const PROPERTIES = '/inventory/properties';
const NEW_PROP = '/inventory/properties/new';

export const InventoryIndex = () => {
  const navigate = useNavigate();

  const toPage = (to: string) => () => navigate(to);

  return (
    <>
    <div className="inventory">
      <h1>Inventario</h1>
      {/* <div className="section">
        <h3>Desarrollos</h3>
        <div className="buttons">
          <button onClick={toPage(DEVELOPMENTS)}>Desarrollos <MdHomeWork /></button>
          <button onClick={toPage(NEW_DEV)}>Nuevo Desarrollo <MdAdd /></button>
        </div>
      </div> */}
      <div className="section">
        <h3>Propiedades</h3>
        <div className="buttons">
          <button onClick={toPage(PROPERTIES)}>Propiedades <MdHouse /></button>
          <button onClick={toPage(NEW_PROP)}>Nueva Propiedad <MdAdd /></button>
        </div>
      </div>

      {/* <div className="section">
        <MapView />
      </div> */}
    </div>
    </>
  );
}