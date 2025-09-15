import React, { useContext, useState } from "react";
import { AddressStep } from "./AddressStep";
import { FeatureStep } from "./FeatureStep";
import { ImageStep } from "./ImageStep";
import { ListingStep } from "./ListingStep";
import { AxiosContext } from "../../AxiosContext";
import { useNavigate } from "react-router-dom";

const steps = ['Ubicacion', 'Detalles', 'Imagenes', 'Publicar'];

export const PropertyWizard = () => {

  const navigate = useNavigate();

  const { authAxios } = useContext(AxiosContext);

  const [ activeStep, setActiveStep ] = useState(0);
  const [ formData, setFormData ] = useState({});

  const [ loading, setLoading ] = useState(false);

  const handleNextStep = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData}));
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const saveProperty = async (stepData: any) => {
    const propertyData = {...formData, ...stepData};
    setLoading(true);
    console.log(propertyData);
    try {
      const response = await authAxios.post('/properties', propertyData);
      console.log('returned...', response);
      if (response.error) {
        //
        console.error(response.error);
      } else {
        navigate(`/inventory/properties/${response._id}`);
      }
    } catch (e) {
      console.error('Failed auth call: ', e);
      setLoading(false);
    }
    // send to server
    // show loading gi
    // navigate to property listing
  };

  return (<>
  <div className="form-container">
    <div className="centered-form">
      <h2 className="">Nueva Propiedad</h2>

      {/* Progress tabs */}
      <div className="wizard-progress">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((Math.min(activeStep, steps.length - 1)) / (steps.length - 1)) * 100}%` }}></div>
        </div>
        <div className="steps">
          {steps.map((label, i) => (<div className={`step ${ i === activeStep ? 'active' : i < activeStep ? 'done' : 'pending'}`} key={label}>{label}</div>))}
        </div>
      </div>

      {/* Loading */}
      { loading && (<div className="loading-div">
        <img src='/loading-gif.gif' alt='loading...' />
      </div>)}

      {/* Active step */}
      {activeStep === 0 && (
        <AddressStep
          initialData={formData}
          onComplete={handleNextStep}
        />
      )}

      {/* Active step */}
      {activeStep === 1 && (
        <FeatureStep
          initialData={formData}
          onComplete={handleNextStep}
        />
      )}

      {/* Active step */}
      {activeStep === 2 && (
        <ImageStep
          initialData={formData}
          onComplete={handleNextStep}
        />
      )}

      {/* Active step */}
      {activeStep === 3 && (
        <ListingStep
          initialData={formData}
          onComplete={saveProperty}
        />
      )}

    </div>
  </div>
  </>);
};