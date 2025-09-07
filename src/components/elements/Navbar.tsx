import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const [ show, setShow ] = useState(false);

  const userLogout = () => {
    logout();
    navigate('/login')
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log('checking for user...', user);
    if (!user) {
      navigate('/login');
      // console.log('no user');
    }
  }, [user, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/' className="navbar-logo"><img src='/long-logo.png' alt='logo' /></a>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-right">
        <button onClick={toggleMenu} className="navbar-dropdown">{user?.name}</button>
        <div className={show ? "navbar-dropmenu" : "hidden"}>
          <div className="navbar-drop-item">
            <button onClick={userLogout} >Log out</button>
          </div>
          <div className="navbar-drop-item">
            <button>Other btn</button>
          </div>
        </div>
      </div>
    </nav>
  );
};