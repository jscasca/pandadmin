import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from "react";

export type MapHandlerProps = {
  // place: google.maps.places.PlaceResult | null;
  // marker: google.maps.marker.AdvancedMarkerElement | null;
  place: any;
  marker: any;
}

export const MapHandler = ({ place, marker }: MapHandlerProps) => {
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