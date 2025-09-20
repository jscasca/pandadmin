import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../elements/Navbar";
import './Home.css';

export default function Root() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <>
    <Navbar />
      <div id="sidebar">
        <h1>EnCasa Panel de Control</h1>
      </div>
      <div id="detail">
        <a className="home-link" href="/inventory">
          <div className="linked-div">
            Inventario
          </div>
        </a>
        <a className="home-link" href="/encasa">
          <div className="linked-div">
            EnCasa
          </div>
        </a>
      </div>
    </>
  );
}