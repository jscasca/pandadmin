import React from "react";
import { Navbar } from "../../elements/Navbar";
import { Outlet } from "react-router-dom";

import { IconContext } from "react-icons";
import {
  MdInventory,
  MdHouse,
  MdHomeWork
} from "react-icons/md";

export const InventoryHome = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
    <Navbar />
    <div className="directory">
      <div ><a href="/inventory"><IconContext.Provider value={{ className: 'directory-icons'}}><MdInventory /></IconContext.Provider></a></div>
      <div ><a href="/inventory/properties"><IconContext.Provider value={{ className: 'directory-icons'}}><MdHouse /></IconContext.Provider></a></div>
      <div ><a href="/inventory/developments"><IconContext.Provider value={{ className: 'directory-icons'}}><MdHomeWork /></IconContext.Provider></a></div>
    </div>
      <div id="sidebar">
        <h1>Inventario</h1>
      </div>
      <div >
        <Outlet />
      </div>
    </>
  );
}