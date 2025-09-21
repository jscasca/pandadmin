import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../elements/Navbar";
import './Home.css';
import { AxiosContext } from "../AxiosContext";
import { MdHome, MdHomeWork, MdManageSearch, MdOutlineSettings, MdAddHomeWork, MdBathtub, MdBed, MdDirectionsCar, MdOutlineHouse } from "react-icons/md";

export default function Root() {
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);

  const [ dash, setDash ] = useState<any>({})
  const [ recent, setRecent ] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    const fetch = async () => {
      const r = await authAxios('/myadmin');
      console.log('result: ', r);
      // Maybe separate into sections here?
      setDash(r);
      if (r.recentProperties && Array.isArray(r.recentProperties)) {
        setRecent(r.recentProperties);
      }
    };
    if (user) fetch();
  }, [ user, loading ]);

  return (
    <>
    <Navbar />
      <div className="topbar">
        <h1>Bienvenido a tu portal EnCasa</h1>
      </div>
      <div className="sidebar-layout">
        <aside className="sidebar">
          <ul>
            <li>
              <a href="/">
              <span><MdHome /></span> Home
              </a>
            </li>
            <li>
              <a href="/inventory">
              <span><MdHomeWork /></span> Propiedades
              </a>
            </li>
            <li>
              <a href="/encasa">
              <span><MdManageSearch /></span> EnCasa API
              </a>
            </li>
            <li>
              <a href="/">
              <span><MdOutlineSettings /></span> Configuracion
              </a>
            </li>
            {/* <li><a href="/">Administracion</a></li> */}
            {/* <li><a href="/settings">Configuracion</a></li> */}
          </ul>
        </aside>
        <div className="main">
          <section className="dashcard">
            <h2>Propiedades</h2>
            <div className="info-card">
              <div className="counters">
                {/* Total */}
                <div className="counter">
                  <span className="">{dash?.stats?.totalProperties}</span>
                  <p>Propiedades</p>
                </div>
                {/* For sale */}
                <div className="counter">
                  <span className="">{dash?.stats?.saleCount}</span>
                  <p>En Venta</p>
                </div>
                {/* For rent */}
                <div className="counter">
                  <span className="">{dash?.stats?.rentCount}</span>
                  <p>En Renta</p>
                </div>
              </div>
              <div className="ctas">
                <button onClick={() => navigate('/inventory/properties/new')} className="btn-primary">
                  <span><MdAddHomeWork /></span> Agregar Propiedad</button>
              </div>
            </div>
          </section>

          <section className="recent-properties">


            <div className="dashactivity">
              <h4>Reciente</h4>
            </div>
            { recent.map((p) => (<div className="property-card">
              <div className="image" style={{'cursor': 'pointer'}} onClick={() => {navigate(`/inventory/properties/${p._id}`)}}>
              <img src={p.picture ? p.picture.url : '/no_image.jpg'} alt={`${p.street} ${p.exterior} ${p.interior}`} />
              </div>
              <div className="info">
                <h3><a href={`/inventory/properties/${p._id}`}>{p.development ? `${p.development} - ${p.interior}` : `${p.street} ${p.exterior}`}</a></h3>
                <div className="">{p.suburb}</div>
                <div className="features">
                  <div className="">{p.rooms ? p.rooms : '-'}<span><MdBed /></span></div>
                  <div className="">{p.bathrooms ? p.bathrooms : '-'}<span><MdBathtub /></span></div>
                  <div className="">{p.parking ? p.parking : '-'}<span><MdDirectionsCar /></span></div>
                  {/* <div className=""><MdOutlineLayers />{p.sqft ? p.sqft : '-'}</div> */}
                </div>
              </div>
            </div>))}
            { recent.length === 0 ? <div className="empty-state">
              <span className="empty-icon"><MdOutlineHouse /></span>
              No hay propiedades recientes
              </div> : (<div className="show-more">
                {/* link to properties */}
              </div>)}
          </section>
        </div>
      </div>
      {/* <div id="sidebar">
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
      </div> */}
    </>
  );
}