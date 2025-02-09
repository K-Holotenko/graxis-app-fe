import { useRef } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { PlacePicker } from '@googlemaps/extended-component-library/react';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';

const API_KEY = 'AIzaSyAY5d1dKnJHgBvCR6EbzFUnzuUPLC9b2qQ';

export const LocationAutocomplete = ({
  onChange,
}: {
  onChange: (location: { lat: number; lng: number; address: string }) => void;
}) => {
  const pickerRef = useRef<TPlacePicker>(null);

  const handlePlaceChange = () => {
    const place = pickerRef.current?.value;

    if (!place || !place.location) {
      return;
    }

    const lat = place.location?.lat();
    const lng = place.location?.lng();
    const address = place.formattedAddress || place.displayName || '';

    onChange({ lat, lng, address });
  };

  return (
    <APIProvider apiKey={API_KEY} version="beta">
      <PlacePicker
        className="picker"
        ref={pickerRef}
        country={['ua']}
        type="address"
        placeholder="Введіть адресу"
        onPlaceChange={handlePlaceChange}
        style={{ width: '100%', borderRadius: '8px', fontSize: '14px' }}
      />
    </APIProvider>
  );
};
