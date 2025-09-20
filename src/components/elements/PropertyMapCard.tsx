import React from "react";
import { MapView } from "./MapView";

type PropertyCardProps = {
  title: string;
  price: number;
  lat: number;
  lng: number;
};

export const PropertyCard = ({ title, price, lat, lng }: PropertyCardProps) => {
  return (
    <div className="property-mapcard">
      <div className="map-preview">
        <MapView
          center={[lat, lng]}
          zoom={14}
          markers={[{ lat, lng, label: title }]}
          height="200px"
        />
      </div>
      <div className="property-info">
        <h3>{title}</h3>
        <p className="price">${price.toLocaleString()}</p>
      </div>
    </div>
  );
};