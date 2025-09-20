import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";

export type PlaceAutocomnpleteProps = {
  onPlaceSelect: (place: any) => void;
  placeholder: string;
  initialValue?: string;
};

export const PlaceAutocomplete = ({ onPlaceSelect, placeholder, initialValue }: PlaceAutocomnpleteProps) => {

  const [ placecomplete, setPlacecomplete ] = useState<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const places = useMapsLibrary('places');

  useEffect(() => {
    console.log(places);
    if (!places || !inputRef.current) return;
    const options = {
      fields: [ 'geometry', 'name', 'formatted_address', 'address_components'],
      componentRestrictions: { country: 'mx'}
    };
    setPlacecomplete(new places.Autocomplete(inputRef.current, options));
  }, [ places ]);

  useEffect(() => {
    if (!placecomplete) return;
    placecomplete.addListener('place_changed', () => {
      const place = placecomplete.getPlace();
      console.log(' autocomplete: ', place);
      onPlaceSelect(placecomplete.getPlace())
    });
  }, [ onPlaceSelect, placecomplete]);

  return (<>
    <div className="autocomplete-container">
      <input defaultValue={initialValue} ref={inputRef} placeholder={placeholder || 'Address'} />
    </div>
  </>);
};

/*

As of March 1st, 2025, google.maps.places.Autocomplete is not available to new customers. Please use google.maps.places.PlaceAutocompleteElement instead. At this time, google.maps.places.Autocomplete is not scheduled to be discontinued, but google.maps.places.PlaceAutocompleteElement is recommended over google.maps.places.Autocomplete. While google.maps.places.Autocomplete will continue to receive bug fixes for any major regressions, existing bugs in google.maps.places.Autocomplete will not be addressed. At least 12 months notice will be given before support is discontinued. Please see https://developers.google.com/maps/legacy for additional details and https://developers.google.com/maps/documentation/javascript/places-migration-overview for the migration guide.

*/