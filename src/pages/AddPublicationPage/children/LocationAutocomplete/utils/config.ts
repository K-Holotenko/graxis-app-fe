import { Location } from 'src/pages/AddPublicationPage/children/AddPublicationForm';

export const formatLocation = (
  place: google.maps.places.PlaceResult
): Location => {
  const location = place.geometry?.location;

  const country = place.address_components?.find((component) =>
    component.types.includes('country')
  )?.long_name;

  const city = place.address_components?.find((component) =>
    component.types.includes('locality')
  )?.long_name;

  const street = place.address_components?.find((component) =>
    component.types.includes('route')
  )?.long_name;

  const streetNumber = place.address_components?.find((component) =>
    component.types.includes('street_number')
  )?.long_name;

  const formatedLocation: Location = {
    country: country || '',
    city: city || '',
    address: `${street || ''} ${streetNumber || ''}`.trim(),
    lat: location?.lat() || 0,
    lng: location?.lng() || 0,
  };

  return formatedLocation;
};
