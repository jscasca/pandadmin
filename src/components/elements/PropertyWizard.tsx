import React, { useState } from "react";
import { AddressStep } from "./AddressStep";
import { FeatureStep } from "./FeatureStep";
import { ImageStep } from "./ImageStep";
import { ListingStep } from "./ListingStep";

const steps = ['Address', 'Features', 'Images', 'Listing'];

export const PropertyWizard = () => {

  const [ activeStep, setActiveStep ] = useState(0);
  const [ formData, setFormData ] = useState({})

  const handleNextStep = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData}));
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  return (<>
  <div className="form-container">
    <div className="centered-form">
      <h2 className="">New Property</h2>

      {/* Progress tabs */}
      <div className="wizard-progress">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}></div>
        </div>
        <div className="steps">
          {steps.map((label, i) => (<div className={`step ${ i === activeStep ? 'active' : i < activeStep ? 'done' : 'pending'}`} key={label}>{label}</div>))}
        </div>
      </div>

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
          onComplete={handleNextStep}
        />
      )}
    </div>

  </div>
  </>);
};