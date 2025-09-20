import React, { useContext, useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../elements/Accordion";
import { AxiosContext } from "../../../AxiosContext";
// import { useNavigate } from "react-router-dom";

import './PropertyEditor.css';
import { Tiptap } from "../../../elements/editor/Tiptap";
import { MdBathtub, MdBed, MdDatasetLinked, MdDirectionsCar, MdOutlineLayers, MdOutlineSubtitles } from "react-icons/md";
import { Amenities } from "../../../elements/propertywizard/FeatureStep";
import { GalleryImage } from "../../../elements/propertywizard/ImageStep";
import { ImageManager } from "../../../elements/ImageManager";
import { AdvancedMarker, APIProvider, Map, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "../../../elements/PlaceAutocomplete";
import { MapHandler } from "../../../elements/MapHandler";
// import { FeatureFieldSet } from "./FeatureFieldset";
// import { ImageFieldSet } from "./ImageFieldSet";
// import { DescriptionFieldSet } from "./DescriptionFieldSet";
// import { DevelopmentFieldSet } from "./DevelopmentFieldSet";
import "react-datepicker/dist/react-datepicker.css";

import * as CONST from '../../../../Constants';
import { CurrencyInput } from "../../../elements/CurrencyInput";
import { Toggle } from "../../../elements/Toggle";

type Props = {
  listingId: string|undefined;
}

// type Listing = {
//   name: string;
//   address: string;
//   street: any;
//   exterior: any;
//   building: any;
//   interior: any;
//   suburb: any;
//   municipality: string;
//   city: string;
//   province: string;
//   zip: string
//   glink: string;
//   property: string;
//   sqft: number;
//   rooms: number;
//   bathrooms: number;
//   parking: number;
//   parktype: string;
//   furnished: string;
//   coverimage: string;
//   pictures: string[];
//   development: string;
// }

export const PropertyEditor = ({ listingId }: Props) => {
  const { authAxios } = useContext(AxiosContext);

  const [ property, setProperty ] = useState<any>();

  const [ changed, setChanged ] = useState(false);

  const [ loading, setLoading ] = useState(false);
  const [ _, setView ] = useState('edit'); // Use when we want to have a view/edit switch

  const handleChange = (attribute: string, change: any) => {
    // set state
    setProperty((prev: any) => ({...prev, ...{[attribute]: change}}));
    setChanged(true);
  };

  const mergeChange = (toMerge: Record<string, any>) => {
    setProperty((prev: any) => ({...prev, ...toMerge}));
    setChanged(true);
  };

  useEffect(() => {
    if (!listingId) return;
    const fetch = async (id: string) => {
      try {
        const result = await authAxios.get(`properties/${id}`);
        setProperty(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetch(listingId);
  }, [listingId, authAxios]);

  const saveChanges = async () => {
    setLoading(true);
    try {
      const response = await authAxios.put(`/properties/${property._id}`, property);
      if (response.error) {
        //
      } else {
        setProperty(response);
        setView('view');
        setChanged(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
    // save
  };
  
  return (<div className="form-container">
    <div className="centered-form">
    { (!property || loading) ? (<div className=""><img alt='loading...' src='/loading-gif.gif' /></div>) : (<div className="">
      <div className="form-title">
        <h2>{property.development ? `${property.development} - ${property.interior}` : `${property.street} ${property.exterior}`}</h2>
      </div>
      <div className="row controls">
        <button onClick={saveChanges} style={{marginLeft: 'auto', marginRight: '2.5rem'}} className="btn-primary" disabled={!changed} >Guardar Cambios</button>
      </div>
      <Accordion className="accordion" type="single" collapsible>
        {/* Address */}
        <AccordionItem className="accordion-item" value="listings">
          <AccordionTrigger className="accordion-header">Publicaciones</AccordionTrigger>
          <AccordionContent>
            <ListingEditor property={property} onChange={handleChange} />
          </AccordionContent>
        </AccordionItem>

        {/* Description */}
        <AccordionItem value="description">
          <AccordionTrigger className="accordion-header">Descripcion</AccordionTrigger>
          <AccordionContent>
            <div className="row">
              <Tiptap content={property?.description} setContent={(c) => handleChange('description', c)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Features */}
        <AccordionItem value="features">
          <AccordionTrigger className="accordion-header">Detalles</AccordionTrigger>
          <AccordionContent>
            <div className="row">
              <div className="field">
                <label><MdBed /><span>Cuartos</span></label>
                <input type="number" value={property?.rooms} onChange={(e) => handleChange('rooms', e.target.value)} />
              </div>
              <div className="field">
                <label><MdBathtub /><span>Banos</span></label>
                <input type="number" value={property?.bathrooms} onChange={(e) => handleChange('bathrooms', e.target.value)} />
              </div>
              <div className="field">
                <label><MdDirectionsCar /><span>Parking</span></label>
                <input type="number" value={property?.parking} onChange={(e) => handleChange('parking', e.target.value)} />
              </div>
              <div className="field">
                <label><MdOutlineLayers /><span>Metros</span></label>
                <input type="number" value={property?.sqft} onChange={(e) => handleChange('sqft', e.target.value)} />
              </div>
            </div>

            <div className="row">
              <Amenities amenities={property?.amenities || []} onChange={(a) => handleChange('amenities', a)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Images */}
        <AccordionItem value="images">
          <AccordionTrigger className="accordion-header">Imagenes</AccordionTrigger>
          <AccordionContent>
            <GalleryEditor gallery={property?.pictures || []} onChange={(g) => handleChange('pictures', g)} />

            {/* <div className="row"> */}
              {/* amenities? */}
            {/* </div> */}
          </AccordionContent>
        </AccordionItem>

        {/* Listings */}

        {/* Location */}
        <AccordionItem className="accordion-item" value="address">
          <AccordionTrigger className="accordion-header">Ubicacion</AccordionTrigger>
          <AccordionContent>
            <AddressEditor property={property} onChange={handleChange} mergeChange={mergeChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>)}
    {/*  */}
    </div>
  </div>);
};

type AddressEditorProps = {
  onChange: (s: string, v: string) => void;
  mergeChange: (o: Record<string, any>) => void;
  property: any;
};

const mapCenter = { lat: 19.43145883973556, lng: -99.13194980120416 };

const buildingTypes = [
  { label: 'Casa', value: 'HOUSE' },
  { label: 'Departamento', value: 'APT' },
  { label: 'Unidad', value: 'UNIT' }
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

export const AddressEditor = ({ property, onChange, mergeChange }: AddressEditorProps) => {

  const [ building, setBuilding ] = useState(property.building || '');
  const [ development, setDevelopment ] = useState(property.development || '');

  const [ interior, setInterior ] = useState(property.interior || '');
  const [ exterior, setExterior ] = useState(property.exterior || '');
  const [ street, setStreet ] = useState(property.street || '');
  const [ suburb, setSuburb ] = useState(property.suburb || '');
  const [ city, setCity ] = useState(property.city || '');
  const [ province, setProvince ] = useState(property.province || '');
  const [ zip, setZip ] = useState(property.zip || '');
  const [ municipality, setMunicipality ] = useState(property.municipality || '');
  const [ link, setLink ] = useState(property.glink || '');

  const [ location, setLocation ] = useState<any>(property.location || {coordinates: [0, 0]});

  const [ selectedPlace, setSelectedPlace ] = useState<any>(null);
  const [ markerRef, marker ] = useAdvancedMarkerRef();

  useEffect(() => {
    if (property.location) {
      setSelectedPlace({lat: property.location.coordinates[1], lng: property.location.coordinates[0]})
    }
  }, []);

  const getPlace = (place: any) => {
    const toMerge: Record<string, any> = {}
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      if (component.types.includes('street_number')) {
        setExterior(component.long_name);
        toMerge['exterior'] = component.long_name;
      }
      if (component.types.includes('route')) {
        setStreet(component.long_name);
        toMerge['street'] = component.long_name;
      }
      if (component.types.includes('sublocality_level_1')) {
        setSuburb(component.long_name);
        toMerge['suburb'] = component.long_name;
      }
      if (component.types.includes('locality')) {
        setCity(component.long_name);
        toMerge['city'] = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        setProvince(component.short_name);
        toMerge['province'] = component.short_name;
      }
      if (component.types.includes('postal_code')) {
        setZip(component.long_name);
        toMerge['zip'] = component.long_name;
      }
    }
    const gLat = place.geometry.location.lat();
    const gLng = place.geometry.location.lng();
    toMerge['location'] = {
      type: 'Point',
      coordinates: [gLng, gLat]
    }
    setLocation({ type: 'Point', coordinates: [gLng, gLat]});
    setLink(`https://www.google.com/maps/search/?api=1&query=${gLat},${gLng}`);
    toMerge['glink'] = `https://www.google.com/maps/search/?api=1&query=${gLat},${gLng}`;
    mergeChange(toMerge);
    setSelectedPlace(place);
  }
  return (<div className="">

    {/* Building type selector */}
    <div className="row">
      {buildingTypes.map(build => (<button
        key={build.value}
        type="button"
        onClick={() => {setBuilding(build.value); onChange('building', build.value)}}
        className={`radio-btn ${building === build.value ? "active":""}`}>
          {build.label}
        </button>))}
    </div>
    {/* Development if APT with autocomplete? */}
    { building === 'APT' && <div className="row">
      <div className="field">
      <input
        value={development}
        onChange={(e) => setDevelopment(e.target.value)}
        onBlur={(e) => onChange('development', e.target.value)}
        placeholder="Nombre del Desarrollo"
      />
      </div>
    </div>}
    {/* Map and interior */}
    <div className="row">
      <div className="field grow2">
        <APIProvider apiKey={CONST.MAP_API} >
          <PlaceAutocomplete initialValue={`${property.street} ${property.exterior}`} onPlaceSelect={getPlace} placeholder="Direccion" />
        </APIProvider>
      </div>
      <div className="field">
        <input
        value={interior}
        onChange={(e) => setInterior(e.target.value)}
        onBlur={(e) => onChange('interior', e.target.value)}
        placeholder="Interior"
        />
      </div>
    </div>

    {/* Map */}
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
    {/* Other fields */}
    <div className="row">
      <div className="field">
        <input
          type="text"
          placeholder="Calle"
          value={street}
          onChange={(e)=>setStreet(e.target.value)}
          onBlur={(e) => onChange('street', e.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="Exterior"
          value={exterior}
          onChange={(e)=>setExterior(e.target.value)}
          onBlur={(e) => onChange('exterior', e.target.value)}
        />
      </div>
    </div>
    {/*  */}
    <div className="row">
      <div className="field">
        <input
          type="text"
          placeholder="Colonia"
          value={suburb}
          onChange={(e)=>setSuburb(e.target.value)}
          onBlur={(e) => onChange('suburb', e.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="Delegacion"
          value={municipality}
          onChange={(e)=>setMunicipality(e.target.value)}
          onBlur={(e) => onChange('municipality', e.target.value)}
        />
      </div>
    </div>
    {/* City, Province, ZIP */}
    <div className="row">
      <div className="field">
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          onBlur={(e) => onChange('city', e.target.value)}
        />
      </div>
      <div className="field">
        <select
          value={province}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProvince((e.target as HTMLSelectElement).value)}
          className=""
        >
          <option value=''>Estado</option>
          {provinces.map(p => (<option key={p.code} value={p.code}>{p.name}</option>))}
        </select>
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="C.P."
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          onBlur={(e) => onChange('zip', e.target.value)}
        />
      </div>
    </div>
    {/* Lat, Lng, Maps */}
    <div className="row">
        <div className="field">
          <input
            disabled={true}
            type="text"
            placeholder="latitud"
            value={location.coordinates[1]}
            // onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            disabled={true}
            type="text"
            placeholder="longitud"
            value={location.coordinates[0]}
            // onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            readOnly={true}
            type="text"
            placeholder="Enlace Google Maps"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
    {/*  */}
  </div>);
}

type GalleryEditorProps = {
  gallery: any[];
  onChange: (arr: any[]) => void;
};

export const GalleryEditor = ({ gallery, onChange }: GalleryEditorProps) => {

  const [ pictures, setPictures ] = useState(gallery || []);

  const [ url, setUrl ] = useState('');
  const [ caption, setCaption ] = useState('');

  const [ preview, setPreview ] = useState(false);
  const [ widget ] = useState(true);

  const checkUrl = (e: any) => {
    setUrl(e.target.value);
    // deferred call to preview?
  };

  const previewUrl = () => {
    if (url !== '') {
      setPreview(true);
    } else {
      setPreview(false);
    }
  };

  const removePreview = () => {
    setPreview(false);
    setCaption('');
    setUrl('');
  };

  const addPicture = () => {
    if (url !== '') {
      const updated = [...pictures, { url, caption }];
      setUrl('');
      setCaption('');
      setPreview(false);
      setPictures(updated);
      onChange(updated)
    } else {
      // mark error
    }
  };

  const removePicture = (i: number) => {
    const updated = pictures.filter((_, index) => index !== i);
    setPictures(updated);
    onChange(updated);
  }

  const onSelectFromGallery = (url: string) => {
    setUrl(url);
    setPreview(true);
  }

  const bumpUp = (i: number) => {
    if (i > 0) {
      const next = [...pictures];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      setPictures(next);
      onChange(next);
    }
  };

  const bumpDown = (i: number) => {
    if (i < pictures.length - 1) {
      const next = [...pictures];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      setPictures(next);
      onChange(next);
    }
  };


  return (<div className="gallery aligned-column">
    {/*  */}
    { pictures.map((pic: any, index: number) => (<div key={pic.url} className="img-card">
      <GalleryImage
        url={pic.url}
        caption={pic.caption}
        remove={() => removePicture(index)}
        bumpDown={index === pictures.length - 1 ? undefined : () => bumpDown(index)}
        bumpUp={index === 0 ? undefined : () => bumpUp(index)}
      />
    </div>))}

    {/* Controls */}
    <div className="row row-fix">
      <div className="label">
        <MdDatasetLinked />
      </div>
      <div className="field grow2">
        <input
          value={url}
          placeholder="URL"
          onChange={checkUrl}
          onBlur={previewUrl}
        />
      </div>
    </div>
    <div className="row row-fix">
      <div className="label">
        <MdOutlineSubtitles />
      </div>
      <div className="field">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Anotaciones"
        />
      </div>

    </div>
    {/* Preview */}
    { preview && <div className="aligned-column">
      <GalleryImage url={url} caption={caption} remove={removePreview} onSave={addPicture} />
    </div>}

    {/* Uploader/Gallery picker: FIX!!! */}
    { widget && <ImageManager onSelect={onSelectFromGallery}/>}
  </div>);
};

type ListingEditorProps = {
  property: any;
  onChange: (s: string, a: any) => void;
};

export const ListingEditor = ({ property, onChange }: ListingEditorProps) => {

  const [ saleprice, setSaleprice ] = useState(property.sale?.price || '');
  const [ available, setAvailable ] = useState(property.sale?.available || '');

  const [ forsale, setForsale] = useState(property.forSale || false);

  const blurSale = (s: string) => {
    onChange('sale', { price: s, available: available });
  };

  const selectDate = (s: any) => {
    setAvailable(s);
    onChange('sale', { price: saleprice, available: s });
  };

  const toggleSale = (b: boolean) => {
    setForsale(b);
    onChange('forSale', b);
  };
  return (<div className="publisher-editor">
    {/*  */}
    <div className="row">
      <div className="field">
        <label>Precio Venta</label>
        <CurrencyInput value={saleprice} onChange={(s) => setSaleprice(s)} onBlur={(s) => blurSale(s)} />
      </div>
      <div className="field">
        <label>Disponible</label>
        <DatePicker selected={available} onChange={selectDate} />
      </div>
      <div className="field shrink">
        <label>Publicar</label>
        <Toggle
          id="list-sale"
          checked={forsale}
          onChange={toggleSale}
        />
      </div>
    </div>
  </div>);
}

// export const PropertyEditor = ({listingId}: Props) => {
//   console.log(listingId);

//   const navigate = useNavigate();

//   const { authAxios } = useContext(AxiosContext);

//   const [ fetching, setFetching ] = useState<boolean>(false);

//   const [ activeTab, setActiveTab ] = useState('features');

//   const [ listing, setListing ] = useState<Listing>();

//   console.log('listing: ', listing);

//   useEffect(() => {

//   }, []);

//   useEffect(() => {
//     if (listingId === undefined) {
//       return;
//     }
//     const fetch = async (id: string) => {
//       setFetching(true);
//       console.log('fetching...'); 
//       try {
//       const result = await authAxios.get(`/inventory/properties/${id}`);
//       console.log('result: ', result.data);
//       setListing(result.data.data);
//       setFetching(false);
//       } catch (e) {
//         console.error('e', e);
//       }
//       // try{
//       //   const response = await authAxios.get('/inventory/clean');
//       // console.log(response);
//       // } catch(e) {
//       //   console.log(e);
//       // }
      
//     };
//     fetch(listingId);
//   }, [ listingId, authAxios ]);

//   const saveForm = () => {
//     console.log(authAxios);
//     navigate('/');
//   };
//   console.log(saveForm);

//   const changeTab = (tab: string) => {
//     setActiveTab(tab)
//   }

//   const coverStyle = {
//     backgroundImage: `url(${listing?.coverimage ? listing.coverimage : '/no_image.jpg'})`
//   };

//   const saveFeatures = async (updates: any) => {
//     console.log('Saving updates: ', updates);
//     // set loading...
//     const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
//     // remove loading...
//     console.log(updated.data);
//     setListing(updated.data.data);
//   };

//   const uploadImage = async (f: File) => {
//     console.log('uploading image: ', f);
//     const updates = { image: f };
//     const opts = { headers: { 'Content-Type': 'multipart/form-data'}};
//     const updated = await authAxios.post(`inventory/properties/${listingId}/images`, updates, opts);
//     console.log('uploaded image: ', updated);
//     // set listing?
//   };

//   const saveUpdates = async (updates: any) => {
//     // set loading ....
//     const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
//     // remove loading...
//     console.log(updated.data);
//     setListing(updated.data.data);
//   }

//   const addImageUrl = async (url: String) => {
//     console.log('adding image: ', url);
//     const updates = {
//       add: {
//         pictures: url
//       }
//     }
//     saveUpdates(updates);
//   };

//   const updateImages = async (images: String[]) => {
//     console.log('saving image order: ', images);
//     // set listing after
//     const updates = {
//       update: {
//         pictures: images
//       }
//     };
//     try {
//     const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
//     console.log(updated.data);
//     setListing(updated.data.data);
//     } catch (e) {
//       console.log('error: ', e);
//     }
//   };

//   return (<>
//     <div className="main-property-container">
//       { fetching ? <img src='/loading-gif.gif' alt='loading...' /> : (<div>
//         <h1>{listing?.name}</h1>
//         <div className="main-property-card">
//           <div className="details">
//             <p>{listing?.street} {listing?.exterior}, {listing?.building} {listing?.interior}</p>
//             <p>{listing?.suburb}</p>
//             <p>{listing?.city}, {listing?.zip}</p>
//           </div>
//           <div className="image">
//             <div className="image-holder" style={coverStyle} ></div>
//             {/* <img src={listing?.coverimage ? listing.coverimage : '/no_image.jpg'} alt='main-image' /> */}
//           </div>
//         </div>
        
//       </div>)}
//       <div className="main-property-tabs">
//         <div className="tab-header">
//           <div className={activeTab === 'features' ? 'active' : ''} onClick={() => changeTab('features')}>Caracteristicas</div>
//           <div className={activeTab === 'images' ? 'active' : ''} onClick={() => changeTab('images')}>Imagenes</div>
//           <div className={activeTab === 'description' ? 'active' : ''} onClick={() => changeTab('description')}>Descripcion</div>
//           <div className={activeTab === 'development' ? 'active' : ''} onClick={() => changeTab('development')}>Ubicacion/Desarrollo</div>
//           {/* <div className={activeTab === 'tab5' ? 'active' : ''} onClick={() => changeTab('tab5')}>Tab 5</div> */}
//         </div>
//         <div className="tab-container">
//           <div className={activeTab === 'features' ? 'active' : ''}>
//             <FeatureFieldSet onSave={saveFeatures} data={listing} />
//           </div>
//           <div className={activeTab === 'images' ? 'active' : ''}>
//             { listingId && (
//               <ImageFieldSet
//                 propertyId={listingId}
//                 onSaveFile={uploadImage}
//                 onSaveUrl={addImageUrl}
//                 onSaveOrder={updateImages}
//                 data={listing} />
//             )}
//           </div>
//           <div className={activeTab === 'description' ? 'active' : ''}>
//             <DescriptionFieldSet onSave={saveFeatures} data={listing} />
//           </div>
//           <div className={activeTab === 'development' ? 'active' : ''}>
//             <DevelopmentFieldSet />
//           </div>
//         </div>
//       </div>
//     </div>
//   </>);
// };