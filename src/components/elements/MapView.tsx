import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

// Fix Leaflet marker icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type MapViewProps = {
  center?: [number, number];
  zoom?: number;
  markers?: { lat: number; lng: number; label?: string }[];
  height?: string;
};

export const MapView = ({
  center = [19.43145883973556, -99.13194980120416],
  zoom = 12,
  markers = [],
  height = "400px",
}: MapViewProps) => {
  return (
    <div className="map-wrapper" style={{ height }}>
      <MapContainer center={center} zoom={zoom} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {markers.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lng]}>
              {m.label && <Popup>{m.label}</Popup>}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};