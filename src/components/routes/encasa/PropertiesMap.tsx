import React, { useContext } from "react";
import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { AxiosContext } from "../../AxiosContext";

import "leaflet/dist/leaflet.css";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";


import L from "leaflet";

// Fix Leaflet marker icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Property = {
  _id: string;
  title: string;
  location: { coordinates: [number, number] }; // [lng, lat]
  price: number;
};

export const PropertiesMap = () => {
  const { publicAxios } = useContext(AxiosContext);

  const [filters, setFilters] = useState({ minPrice: "100000", maxPrice: "100000000" });
  const [bounds, setBounds] = useState<number[] | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // const [map, setMap] = useState<any>(null);

  console.log(loading, setFilters);

  // --- Fetch function ---
  const fetchProperties = useCallback(async () => {
    if (!bounds) return;
    setLoading(true);

    const query = new URLSearchParams({
      ...filters,
      bounds: bounds.join(","),
    });

    const res = await publicAxios.get(`/v1/map?${query}`);
    console.log(res.data);

    // const res = await fetch(`/api/properties?${query}`);
    setProperties(res.data);
    setLoading(false);
  }, [filters, bounds]);

  // --- Trigger fetch whenever bounds or filters change (debounced) ---
  useEffect(() => {
    if (!bounds) return;
    console.log('set first fetch...');
    const timeout = setTimeout(fetchProperties, 400); // debounce
    return () => { console.log('clear timeout'); clearTimeout(timeout);}
  }, [fetchProperties, bounds]);

  // --- Track map bounds ---
  function MapBoundsTracker() {
    const map = useMapEvents({
      moveend: () => {
        console.log('loaded, settings bounds');
        const b = map.getBounds();
        setBounds([b.getNorth(), b.getWest(), b.getSouth(), b.getEast()]);
      },
    });
    useEffect(() => {
      if (!bounds) {
      const b = map.getBounds();
      setBounds([b.getNorth(), b.getWest(), b.getSouth(), b.getEast()]);
      }
    }, [map, bounds]);
    return null;
  }

  return (
    <div className="encasa-map-wrapper" style={{ display: "flex", height: "600px" }}>
      {/* Sidebar filters */}
      {/* <div style={{ width: "250px", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>Filters</h3>
        <label>
          Min Price:
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
        </label>
        <br />
        <label>
          Max Price:
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </label>
        {loading && <p>Loading...</p>}
      </div> */}
      {/* Sidebar */}
      <div className={`map-sidebar`}>
        {
          <div className="sidebar-content">
            <h3>Filters</h3>
            <label>
              Price range:
              <input type="text" placeholder="e.g. 1000 - 5000" />
            </label>
            <label>
              Bedrooms:
              <select>
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
              </select>
            </label>
            <button className="btn-primary">Apply</button>
          </div>
        }
      </div>

      {/* Map */}
      {/* <div className="encasa-map"> */}
        <MapContainer
          center={[19.43145883973556, -99.13194980120416]} // Default to CDMX { lat: 19.43145883973556, lng: -99.13194980120416 };
          zoom={12}
          style={{ flex: 1 }}
          // ref={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <MapBoundsTracker />

          <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster: any) => {
            const count = cluster.getChildCount();
        
            let size = "small";
            if (count > 50) size = "large";
            else if (count > 20) size = "medium";
        
            return L.divIcon({
              html: `<div class="cluster-marker ${size}">${count}</div>`,
              className: "custom-cluster-icon",
              iconSize: L.point(40, 40, true),
            });
          }}
          >
            {properties.map((p) => (
              <Marker
                key={p._id}
                position={[p.location.coordinates[1], p.location.coordinates[0]]} // [lat, lng]
              >
                <Popup>
                  <b>{p.title}</b>
                  <br />
                  Price: ${p.price}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      {/* </div> */}
    </div>
  );
}
