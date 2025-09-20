import React from "react";
import { Navbar } from "../../elements/Navbar";

// import {
//   MdInventory,
//   MdHouse,
//   MdHomeWork
// } from "react-icons/md";

// import { PropertiesMap } from "./PropertiesMap";
import { Outlet } from "react-router-dom";
import { MdManageSearch, MdMap } from "react-icons/md";

export const EncasaHome = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
    {/* <div>Hola</div> */}
    <Navbar />
    <div className="directory">
      <div className="item"><a href="/encasa/search"><MdManageSearch /> Busqueda</a></div>
      <div className="item"><a href="/encasa/map"><MdMap /> Mapa</a></div>
    </div>
    <div>
      <Outlet />
    </div>
    {/* <PropertiesMap /> */}
    {/* <div className="directory">
      <div className="item" ><a href="/inventory"><MdInventory /> Inventario</a></div>
      <div className="item" ><a href="/inventory/properties"><MdHouse /> Propiedades</a></div>
      <div className="item" ><a href="/inventory/developments"><MdHomeWork /> Desarrollos</a></div>
    </div>
    <div >
      <Outlet />
    </div> */}
    </>
  );
}