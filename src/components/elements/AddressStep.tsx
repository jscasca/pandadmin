import React, { useEffect, useRef, useState } from "react";
import * as CONST from '../../Constants';

import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

type Props = {
  initialData: any;
  onComplete: (data: any) => void;
};

const mapCenter = { lat: 19.43145883973556, lng: -99.13194980120416 };

const buildingTypes = [
  { label: 'House', value: 'HOUSE' },
  { label: 'Apartment', value: 'APT' },
  { label: 'Unit', value: 'UNIT' }
];

const provinces = [
  { code: "AGS", name: "Aguascalientes" },
  { code: "BC", name: "Baja California" },
  { code: "BCS", name: "Baja California Sur" },
  { code: "CAMP", name: "Campeche" },
  { code: "COAH", name: "Coahuila" },
  { code: "COL", name: "Colima" },
  { code: "CHIS", name: "Chiapas" },
  { code: "CHIH", name: "Chihuahua" },
  { code: "CDMX", name: "Ciudad de México" },
  { code: "DGO", name: "Durango" },
  { code: "GTO", name: "Guanajuato" },
  { code: "GRO", name: "Guerrero" },
  { code: "HGO", name: "Hidalgo" },
  { code: "JAL", name: "Jalisco" },
  { code: "MEX", name: "Estado de México" },
  { code: "MICH", name: "Michoacán" },
  { code: "MOR", name: "Morelos" },
  { code: "NAY", name: "Nayarit" },
  { code: "NL", name: "Nuevo León" },
  { code: "OAX", name: "Oaxaca" },
  { code: "PUE", name: "Puebla" },
  { code: "QRO", name: "Querétaro" },
  { code: "QROO", name: "Quintana Roo" },
  { code: "SLP", name: "San Luis Potosí" },
  { code: "SIN", name: "Sinaloa" },
  { code: "SON", name: "Sonora" },
  { code: "TAB", name: "Tabasco" },
  { code: "TAMPS", name: "Tamaulipas" },
  { code: "TLAX", name: "Tlaxcala" },
  { code: "VER", name: "Veracruz" },
  { code: "YUC", name: "Yucatán" },
  { code: "ZAC", name: "Zacatecas" }
];

export const AddressStep = ({ initialData, onComplete }: Props) => {
  // Type of building: buildingTypes
  const [ building, setBuilding ] = useState(initialData.building || 'APT');

  //
  const [ street, setStreet ] = useState(initialData.street || '');
  const [ exterior, setExterior ] = useState(initialData.exterior || '');
  const [ interior, setInterior ] = useState(initialData.interior || '');
  //
  const [ suburb, setSuburb ] = useState(initialData.suburb || '');
  const [ municipality, setMunicipality ] = useState(initialData.municipality || '');
  const [ city, setCity ] = useState(initialData.city || ''); // Ciudad
  const [ province, setProvince ] = useState(initialData.province || ''); // Estado
  const [ zip, setZip ] = useState(initialData.zip || '');
  const [ lat, setLat ] = useState(initialData.lat || '');
  const [ lng, setLng ] = useState(initialData.lng || '');
  const [ link, setLink ] = useState(initialData.link || '');

  const [ selectedPlace, setSelectedPlace ] = useState<any>(null);
  const [ markerRef, marker ] = useAdvancedMarkerRef();

  const getPlace = (place: any) => {
    // console.log(place)
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      console.log(component);
      if (component.types.includes('street_number')) {setExterior(component.long_name);}
      if (component.types.includes('route')) {setStreet(component.long_name);}
      if (component.types.includes('sublocality_level_1')) {setSuburb(component.long_name);}
      if (component.types.includes('locality')) {setCity(component.long_name);}
      if (component.types.includes('administrative_area_level_1')) {setProvince(component.short_name);}
      if (component.types.includes('postal_code')) {setZip(component.long_name);}
      // const componentType = component.types[0];
      // switch (componentType) {
      //   case 'street_number': { setExterior(component.long_name); break; }
      //   case 'route': { setStreet(component.long_name); break; }
      //   case 'sublocality_level_1': { console.log('setting suburbb to ', component.long_name) ;setSuburb(component.long_name); break; }
      //   case 'locality': { setCity(component.long_name); break; }
      //   case 'administrative_area_level_1': { setProvince(component.short_name); break; }
      //   case 'postal_code': { setZip(component.long_name); break; }
      // }
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
  }

  const validate = () => {
    if (building !== 'HOUSE' && interior === '') return false;
    if (street === '' || exterior === '' || suburb === '' || city === '') return false;
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      const addressData = {
        street,
        exterior,
        interior,
        suburb,
        municipality,
        city,
        province,
        location: {
          type: 'Point',
          coordinates: [lng, lat]
        } // [long,lat]
      };
      onComplete(addressData);
    } else {
      // mark errors
    }
  };

  return (<>
    <div className="appform">
      <div className="row">
        <div className="notifications">{}</div>
        <button style={{marginLeft: 'auto', marginRight: '2.5rem'}} className="btn-primary" type='button' onClick={handleNext}>Next</button>
      </div>
      <div className="row">
        <span>My listing is:</span>
        {buildingTypes.map(build => (<button
        key={build.value}
        type="button"
        onClick={() => setBuilding(build.value)}
        className={`radio-btn ${building === build.value ? "active":""}`}>{build.label}</button>))}
      </div>
      <div className="row">
        <div className="field grow2">
          <APIProvider apiKey={CONST.MAP_API}>
            <PlaceAutocomplete onPlaceSelect={getPlace} />
          </APIProvider>
        </div>
        <div className="field">
          <input
            disabled={building === 'HOUSE'}
            type="text"
            placeholder="Interior"
            value={interior}
            onChange={(e)=>setInterior(e.target.value)}
          />
        </div>
      </div>
      <div className="row map">
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
      <div className="row">
        <div className="field">
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e)=>setStreet(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Exterior"
            value={exterior}
            onChange={(e)=>setExterior(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <input
            type="text"
            placeholder="Suburb"
            value={suburb}
            onChange={(e)=>setSuburb(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Municipality"
            value={municipality}
            onChange={(e)=>setMunicipality(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />
        </div>
        <div className="field">
          <select
            value={province}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProvince((e.target as HTMLSelectElement).value)}
            className=""
          >
            <option value=''>State</option>
            {provinces.map(p => (<option key={p.code} value={p.code}>{p.name}</option>))}
          </select>
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <input
            disabled={true}
            type="text"
            placeholder="latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            disabled={true}
            type="text"
            placeholder="longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            readOnly={true}
            type="text"
            placeholder="Maps link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
    </div>
  </>);
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