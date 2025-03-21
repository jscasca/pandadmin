import React, { useContext, useEffect, useState } from "react";

import { AxiosContext } from "../../../AxiosContext";
import { useNavigate } from "react-router-dom";

import './PropertyEditor.css';
import { FeatureFieldSet } from "./FeatureFieldset";
import { ImageFieldSet } from "./ImageFieldSet";
import { DescriptionFieldSet } from "./DescriptionFieldSet";
import { DevelopmentFieldSet } from "./DevelopmentFieldSet";

type Props = {
  listingId: string|undefined;
}

type Listing = {
  name: string;
  address: string;
  street: any;
  exterior: any;
  building: any;
  interior: any;
  suburb: any;
  municipality: string;
  city: string;
  province: string;
  zip: string
  glink: string;
  property: string;
  sqft: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  parktype: string;
  furnished: string;
  coverimage: string;
  pictures: string[];
  development: string;
}

export const PropertyEditor = ({listingId}: Props) => {
  console.log(listingId);

  const navigate = useNavigate();

  const { authAxios } = useContext(AxiosContext);

  const [ fetching, setFetching ] = useState<boolean>(false);

  const [ activeTab, setActiveTab ] = useState('features');

  const [ listing, setListing ] = useState<Listing>();

  console.log('listing: ', listing);

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (listingId === undefined) {
      return;
    }
    const fetch = async (id: string) => {
      setFetching(true);
      console.log('fetching...'); 
      const result = await authAxios.get(`/inventory/properties/${id}`);
      console.log('result: ', result.data);
      setListing(result.data.data);
      setFetching(false);
      // try{
      //   const response = await authAxios.get('/inventory/clean');
      // console.log(response);
      // } catch(e) {
      //   console.log(e);
      // }
      
    };
    fetch(listingId);
  }, [ listingId, authAxios ]);

  const saveForm = () => {
    console.log(authAxios);
    navigate('/');
  };
  console.log(saveForm);

  const changeTab = (tab: string) => {
    setActiveTab(tab)
  }

  const coverStyle = {
    backgroundImage: `url(${listing?.coverimage ? listing.coverimage : '/no_image.jpg'})`
  };

  const saveFeatures = async (updates: any) => {
    console.log('Saving updates: ', updates);
    // set loading...
    const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
    // remove loading...
    console.log(updated.data);
    setListing(updated.data.data);
  };

  const uploadImage = async (f: File) => {
    console.log('uploading image: ', f);
    const updates = { image: f };
    const opts = { headers: { 'Content-Type': 'multipart/form-data'}};
    const updated = await authAxios.post(`inventory/properties/${listingId}/images`, updates, opts);
    console.log('uploaded image: ', updated);
    // set listing?
  };

  const saveUpdates = async (updates: any) => {
    // set loading ....
    const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
    // remove loading...
    console.log(updated.data);
    setListing(updated.data.data);
  }

  const addImageUrl = async (url: String) => {
    console.log('adding image: ', url);
    const updates = {
      add: {
        pictures: url
      }
    }
    saveUpdates(updates);
  };

  const updateImages = async (images: String[]) => {
    console.log('saving image order: ', images);
    // set listing after
    const updates = {
      update: {
        pictures: images
      }
    };
    const updated = await authAxios.put(`/inventory/properties/${listingId}`, updates);
    console.log(updated.data);
    setListing(updated.data.data);
  };

  return (<>
    <div className="main-property-container">
      { fetching ? <img src='/loading-gif.gif' alt='loading...' /> : (<div>
        <h1>{listing?.name}</h1>
        <div className="main-property-card">
          <div className="details">
            <p>{listing?.street} {listing?.exterior}, {listing?.building} {listing?.interior}</p>
            <p>{listing?.suburb}</p>
            <p>{listing?.city}, {listing?.zip}</p>
          </div>
          <div className="image">
            <div className="image-holder" style={coverStyle} ></div>
            {/* <img src={listing?.coverimage ? listing.coverimage : '/no_image.jpg'} alt='main-image' /> */}
          </div>
        </div>
        
      </div>)}
      <div className="main-property-tabs">
        <div className="tab-header">
          <div className={activeTab === 'features' ? 'active' : ''} onClick={() => changeTab('features')}>Caracteristicas</div>
          <div className={activeTab === 'images' ? 'active' : ''} onClick={() => changeTab('images')}>Imagenes</div>
          <div className={activeTab === 'description' ? 'active' : ''} onClick={() => changeTab('description')}>Descripcion</div>
          <div className={activeTab === 'development' ? 'active' : ''} onClick={() => changeTab('development')}>Ubicacion/Desarrollo</div>
          {/* <div className={activeTab === 'tab5' ? 'active' : ''} onClick={() => changeTab('tab5')}>Tab 5</div> */}
        </div>
        <div className="tab-container">
          <div className={activeTab === 'features' ? 'active' : ''}>
            <FeatureFieldSet onSave={saveFeatures} data={listing} />
          </div>
          <div className={activeTab === 'images' ? 'active' : ''}>
            { listingId && (
              <ImageFieldSet
                propertyId={listingId}
                onSaveFile={uploadImage}
                onSaveUrl={addImageUrl}
                onSaveOrder={updateImages}
                data={listing} />
            )}
          </div>
          <div className={activeTab === 'description' ? 'active' : ''}>
            <DescriptionFieldSet onSave={saveFeatures} data={listing} />
          </div>
          <div className={activeTab === 'development' ? 'active' : ''}>
            <DevelopmentFieldSet />
          </div>
        </div>
      </div>
    </div>
  </>);
};