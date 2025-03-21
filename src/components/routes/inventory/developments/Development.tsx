import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { DevelopmentEditor } from "./DevelopmentEditor";
import './Development.css';
import { MdBathtub, MdBed, MdDirectionsCar, MdOutlineLayers } from "react-icons/md";

export const Development = () => {

  const location = useLocation();
  console.log(location);
  const state = location.state;
  let { id } = useParams();
  console.log('Development:', id, state);
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
      <div className="development-container">
        <DevelopmentEditor developmentId={id} />
      </div>
    </>
  );
};

type PropertyCardProps = {
  data: Record<string, any>;
  selected?: boolean;
  onClick?: () => void;
};

export const PropertyCard = ({ data, onClick = () => {}, selected = false }: PropertyCardProps) => {

  const handleClick = (_: any) => {
    // ev.preventDefault();
    onClick();
  };

  console.log(data);

  return (<div onClick={handleClick} className={selected ? 'unit selected' : "unit"}>
    <div className="cover">
      <div className="img-holder">
        <img src={data.cover ? data.cover:'/no_image.jpg'} alt="property cover"/>
      </div>
    </div>
    <div className="details">
      <h4><a href={'/inventory/properties/' + data._id} >Unidad {data.building? data.building + ' - ' : ''}{data.interior}</a></h4>
      <p>{data.street} {data.exterior}</p>
      <p>{data.suburb}</p>
      
      <div className="features">
        <div className="feature"><MdBed /> <span>{data.rooms ? data.rooms : '-'}</span></div>
        <div className="feature"><MdBathtub /> <span>{data.bathrooms ? data.bathrooms : '-'}</span></div>
        <div className="feature"><MdDirectionsCar /> <span>{data.parking ? data.parking : '-'}</span></div>
        <div className="feature"><MdOutlineLayers /> <span>{data.sqft ? data.sqft + "m\u00b2" : '-'}</span></div>
            
      </div>
    </div>
  </div>);
}