import React, { useContext, useEffect, useRef, useState } from "react";
import './NewAptForm.css';

import * as CONST from '../../Constants';

import {
  APIProvider,
  // ControlPosition,
  // MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  // ControlPosition,
  // MapControl,
  // AdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { AxiosContext } from "../AxiosContext";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "./Autocomplete";


export const NewAptForm = () => {

  const navigate = useNavigate();

  const { authAxios } = useContext(AxiosContext);

  // Get maps: https://visgl.github.io/react-google-maps/docs/get-started
  // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
  // More maps examples: https://dev.to/aneeqakhan/how-to-add-google-maps-to-your-web-app-using-react-3c3e

  const [property, setProperty] = useState("DEPTO"); // DEPTO o CASA
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [interior, setInterior] = useState("");
  const [exterior, setExterior] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState(""); // localizacion o colonia, vecindario, manzana o cuadra
  const [municipality, setMunicipality] = useState(""); // Provincia o Delegacion o municipio
  const [city, setCity] = useState(""); // Ciudad
  const [province, setProvince] = useState(""); // Estado
  const [zip, setZip] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [link, setLink] = useState("");

  const [mapAutocompleter, setMapAutocompleter] = useState(true);

  const [isLoading, setLoading ] = useState(false);

  const [ selectedPlace, setSelectedPlace ] = useState<any>(null);
  const [ markerRef, marker ] = useAdvancedMarkerRef();

  const mapCenter = { lat: 19.43145883973556, lng: -99.13194980120416 };

  const getPlace = (place: any) => {
    console.log(place);
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      console.log(component);
      const componentType = component.types[0];
      switch (componentType) {
        case 'street_number': { setExterior(component.long_name); break; }
        case 'route': { setStreet(component.long_name); break; }
        case 'sublocality_level_1': { setSuburb(component.long_name); break; }
        case 'locality': { setCity(component.long_name); break; }
        case 'administrative_area_level_1': { setProvince(component.long_name); break; }
        case 'postal_code': { setZip(component.long_name); break; }
      }
    }
    const gLat = place.geometry.location.lat();
    const gLng = place.geometry.location.lng();
    console.log("location: ", place.geometry.location);
    console.log(gLat, gLng);
    if (gLat && gLng) {
      setLat(gLat);
      setLng(gLng);
      setLink(`https://www.google.com/maps/search/?api=1&query=${gLat},${gLng}`);
    }
    setSelectedPlace(place);
  };

  // const delay = async (ms: number) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  const saveForm = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (street === '' || exterior === '' || suburb === '' || city === '') {
      // Show error msg
      console.error('missing values');
      return;
    }
    // gather all the info and save
    // do some validation here?
    // redirect to saved
    console.log('saving...');
    setLoading(true);
    const savingAddress = {
      property,
      development: name,
      street,
      exterior,
      building,
      interior,
      suburb,
      municipality,
      city,
      province,
      zip,
      lat,
      lng,
      link
    };
    try {
      // navigate to next
      const response = await authAxios.put('/inventory/properties', savingAddress);
      console.log('saved: ', response);
      setLoading(false);
      if (response.data.error) {
        // show error??
        console.error(response.data.error);
      } else {
        navigate(`/inventory/properties/${response.data.data._id}`, response.data.data);
      }
    } catch (e) {
      console.error('Failed auth call: ', e);
      // show error msg??
      setLoading(false);
    }
  };
  const reset = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setName("");
    setBuilding("");
    setStreet("");
    setExterior("");
    setInterior("");
    setSuburb("");
    setMunicipality("");
    setCity("");
    setProvince("");
    setZip("");
    setLink("");
    setLat("");
    setLng("");
    setSelectedPlace(null);
  };

  const buildingRef = useRef<HTMLInputElement>(null);

  const autocompleteSelect = (suggestion: any) => {
    console.log('trigger select: ', suggestion);
    console.log('current state: ', name);
    if (suggestion) {
      console.log('setting suggestion: ', suggestion);
      setName(suggestion.name ? suggestion.name : name);
      setStreet(suggestion.street ? suggestion.street : street);
      setExterior(suggestion.exterior ? suggestion.exterior : exterior);
      setSuburb(suggestion.suburb ? suggestion.suburb : suburb);
      setCity(suggestion.city ? suggestion.city : city);
      setMunicipality(suggestion.municipality ? suggestion.municipality : municipality);
      setProvince(suggestion.province ? suggestion.province : province);
      setZip(suggestion.zip ? suggestion.zip : zip);
      setLat(suggestion.lat ? suggestion.lat : lat);
      setLng(suggestion.lng ? suggestion.lng : lng);
      setLink(suggestion.link ? suggestion.link : link);
      if (suggestion.lat && suggestion.lng) {
        setSelectedPlace({lat: suggestion.lat, lng: suggestion.lng});
      }
    }
    setMapAutocompleter(false);
    buildingRef.current?.focus();
  }

  return (<div className="newapt-container">
    <form className="newapt-form">
      <fieldset className="section form-address">
        <legend className="section-legend">Agregar Ubicacion</legend>
        <div className="section-form">
          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="property" >Propiedad</label>
              <select
                id="property"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="">
                <option value="CASA">Casa</option>
                <option value="DEPTO">Depto</option>
              </select>
            </div>
            <div className="field medium">
              <label htmlFor="name" >Desarrollo</label>
              {/* <input
                disabled={property === "CASA"}
                className={name ? "" : "empty"}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              /> */}
              <Autocomplete
                value={name}
                disabled={property === "CASA"}
                id="name"
                onChange={(e) => setName(e.target.value)}
                onSelect={autocompleteSelect}
                fetchUrl="/inventory/developments"
              />
            </div>
            <div className="field medium">
              <label htmlFor="building">Edificio</label>
              <input
                disabled={property === "CASA"}
                className={building ? "" : "empty"}
                id="building"
                value={building}
                ref={buildingRef}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="Building"
              />
            </div>
          </div>

          {mapAutocompleter && (<div className="newapt-form-row">
            <div className="field">
              <label>Address</label>
              <APIProvider apiKey={CONST.MAP_API}>
                <PlaceAutocomplete onPlaceSelect={getPlace} />
              </APIProvider>
            </div>
          </div>)}

          <div className="newapt-form-row">
            <div className="field long">
              <label htmlFor="">Calle</label>
              <input
                className={street ? "" : "empty"}
                id="building"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Building"
              />
            </div>
            <div className="field short">
              <label htmlFor="exterior">Exterior</label>
              <input
                className={exterior ? "" : "empty"}
                id="exterior"
                value={exterior}
                onChange={(e) => setExterior(e.target.value)}
                placeholder="Exterior"
              />
            </div>
            
            <div className="field short">
              <label htmlFor="">Interior</label>
              <input
                disabled={property === "CASA"}
                className={interior ? "" : "empty"}
                id="interior"
                value={interior}
                onChange={(e) => setInterior(e.target.value)}
                placeholder="Interior"
              />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="suburb" >Colonia (Suburbio)</label>
              <input
                className={suburb ? "" : "empty"}
                id="suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Suburb"
              />
            </div>
            <div className="field">
              <label htmlFor="municipality" >Delegacion (Municipio)</label>
              <input
                className={municipality ? "" : "empty"}
                id="municipality"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                placeholder="Municipality"
              />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="city" >Ciudad</label>
              <input
                className={city ? "" : "empty"}
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="field">
              <label htmlFor="province">Estado (Provincia)</label>
              <input
                className={province ? "" : "empty"}
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
              />
            </div>
            <div className="field short">
              <label htmlFor="zip">CP</label>
              <input
                className={zip ? "" : "empty"}
                id="zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip"
              />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="link" >Google maps</label>
              <input
                className={link ? "" : "empty"}
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Gmaps link"
              />
            </div>
          </div>

          <div className="newapt-form-row">
            <div className="field">
              <label htmlFor="xcoord">Coords: X</label>
              <input
                className={lat ? "" : "empty"}
                id="xcoord"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="X"
              />
            </div>
            <div className="field">
              <label htmlFor="ycoord">Coords: Y</label>
              <input
                className={lng ? "" : "empty"}
                id="ycoord"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Y"
              />
            </div>
          </div>
        </div>
      
        <div className="map">
        <APIProvider apiKey={CONST.MAP_API}>
          <Map
            reuseMaps={true}
            mapId='TEST_MAP'
            style={{width: '600px', height: '600px'}}
            defaultZoom={13}
            defaultCenter={mapCenter}
            >
              <AdvancedMarker ref={markerRef} position={null} />
          </Map>
            <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
        </div>

        <div className="newapt-controls">
          <button className="main" onClick={saveForm}
            disabled={!(street !== '' && exterior !== '' && suburb !== '' && city !== '' && province !== '' && !isLoading)}
          >{ isLoading ? <img src='/loading-gif.gif' alt='loading...' /> : 'Guardar'}</button>
          <button onClick={reset}>Cancelar</button>
        </div>
      </fieldset>
      
    </form>
  </div>);
};

interface MapHandlerProps {
  // place: google.maps.places.PlaceResult | null;
  // marker: google.maps.marker.AdvancedMarkerElement | null;
  place: any;
  marker: any;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    if (place.geometry) {
      marker.position = place.geometry?.location;
    }
    // marker.position = place.geometry?.location;
    if (place.lng && place.lat) {
      marker.position = {lat: place.lat, lng: place.lng};
      const latlng = new google.maps.LatLng(place.lat, place.lng);
      map.setCenter(latlng);
      map.setZoom(17);
    }
  }, [map, place, marker]);

  return null;
}

interface PlaceAutocompleteProps {
  // onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onPlaceSelect: (place: any) => void;
  placeholder?: string;
}

// const AutoComplete = () => {
// //   const autoCompleteRef = useRef<any>();
// //   const inputRef = useRef<any>();
//   const places = useMapsLibrary('places');
//   useEffect(() => {
//     if (!places) {
//       console.log('no places ready');
//       return;
//     }
//     console.log('places ready', places);
//   }, [places]);

// //   console.log(onPlaceSelect);

// //   useEffect(() => {
// //     if (!places || !inputRef.current) return;

// //     const options = {
// //       fields: ['geometry', 'name', 'formatted_address'],
// //       componentRestrictions: { country: 'mx'}
// //     };
// //     autoCompleteRef.current = new places.Autocomplete(inputRef.current, options);
// //   }, [places]);
  
// //  useEffect(() => {
// //   if (!autoCompleteRef.current) return;
// //   autoCompleteRef.current.addListener("place_changed", async function () {
// //    const place = await autoCompleteRef.current.getPlace();
// //    console.log({ place });
// //    onPlaceSelect(place);
// //   });
// //  }, [onPlaceSelect]);
// //  return (
// //    <input ref={inputRef} placeholder={placeholder} />
// //  );
// return (<input placeholder="Placeholder"/>
// );
// };

// https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions
// 
const PlaceAutocomplete = ({ onPlaceSelect, placeholder }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'address_components'],
      componentRestrictions: { country: 'mx'}
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      console.log(place.geometry?.location?.lat(), place.geometry?.location?.lng());
      console.log(placeAutocomplete);
      console.log(placeAutocomplete.getPlace());
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} placeholder={placeholder} />
    </div>
  );
};