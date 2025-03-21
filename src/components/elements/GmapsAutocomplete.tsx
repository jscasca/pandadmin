import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  onPlaceSelect: (place: any) => void;
  placeholder?: string;
};

export const GmapsAutocomplete = ({ onPlaceSelect, placeholder }: Props) => {
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