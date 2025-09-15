import React, { useContext, useEffect, useState } from "react";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../../elements/Accordion";
import { AxiosContext } from "../../../AxiosContext";
// import { useNavigate } from "react-router-dom";

import './PropertyEditor.css';
import { Tiptap } from "../../../elements/editor/Tiptap";
import { MdBathtub, MdBed, MdDirectionsCar, MdOutlineLayers } from "react-icons/md";
import { Amenities } from "../../../elements/propertywizard/FeatureStep";
import { GalleryImage } from "../../../elements/propertywizard/ImageStep";
// import { FeatureFieldSet } from "./FeatureFieldset";
// import { ImageFieldSet } from "./ImageFieldSet";
// import { DescriptionFieldSet } from "./DescriptionFieldSet";
// import { DevelopmentFieldSet } from "./DevelopmentFieldSet";

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
  console.log('listing: ', listingId);
  const { authAxios } = useContext(AxiosContext);

  const [ property, setProperty ] = useState<any>();

  const handleChange = (attribute: string, change: any) => {
    // set state
    console.log(attribute, change);
    setProperty((prev: any) => ({...prev, ...{[attribute]: change}}))
  };

  useEffect(() => {
    if (!listingId) return;
    const fetch = async (id: string) => {
      try {
        console.log('getting: ', id);
        const result = await authAxios.get(`properties/${id}`);
        console.log("r: ", result);
        setProperty(result);
      } catch (err) {
        console.error(err);
      }
    };
    console.log('fetching...');
    fetch(listingId);
  }, [listingId, authAxios]);
  
  return (<div className="form-container">
    <div className="centered-form">
    { (!property) ? (<div className=""><img src='/loading-gif.gif' /></div>) : (<div className="">
      <Accordion className="accordion" type="single" collapsible>
        {/* Address */}
        <AccordionItem className="accordion-item" value="listings">
          <AccordionTrigger className="accordion-header">Publicaciones</AccordionTrigger>
          <AccordionContent>
            <input placeholder="Direccion" />
            <input placeholder="Otro" value={''} />
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

            <div className="row">
              {/* amenities? */}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Listings */}

        {/* Location */}
        <AccordionItem className="accordion-item" value="address">
          <AccordionTrigger className="accordion-header">Ubicacion</AccordionTrigger>
          <AccordionContent>
            <input placeholder="Direccion" />
            <input placeholder="Otro" value={''} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>)}
    {/*  */}
    </div>
  </div>);
};

type GalleryEditorProps = {
  pictures: any[];
  onChange: (arr: any[]) => void;
};

export const GalleryEditor = ({ pictures, onChange }: GalleryEditorProps) => {

  const [ pictureArr, setPictureArr ] = useState(pictures || []);

  console.log('opnchange', onChange, pictureArr, setPictureArr);

  return (<div className="gallery aligned-column">
    {/*  */}
    { pictureArr.map((pic: any, index: number) => (<div key={pic.url} className="img-card">
      <GalleryImage
        url={pic.url}
        caption={pic.caption}
        remove={() => console.log(index)}
      />
    </div>))}
  </div>);
};

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