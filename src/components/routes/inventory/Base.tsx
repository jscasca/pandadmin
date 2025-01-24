import React from "react";
import { Navbar } from "../../elements/Navbar";
import { Outlet } from "react-router-dom";

import {
  MdInventory,
  MdHouse,
  MdHomeWork
} from "react-icons/md";

import './Base.css';

export const InventoryHome = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
    <Navbar />
    <div className="directory">
      <div className="item" ><a href="/inventory"><MdInventory /> Inventario</a></div>
      <div className="item" ><a href="/inventory/properties"><MdHouse /> Propiedades</a></div>
      <div className="item" ><a href="/inventory/developments"><MdHomeWork /> Desarrollos</a></div>
    </div>
    <div >
      <Outlet />
    </div>
    </>
  );
}