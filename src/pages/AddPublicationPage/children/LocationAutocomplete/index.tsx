import { useState, useEffect, useRef, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Select } from 'antd';

import { useDebounce } from 'src/hooks/useDebounce';

interface PlacesAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

interface PlacesAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  style?: React.CSSProperties;
}

const { Option } = Select;

export const PlacesAutocomplete = ({
  onPlaceSelect,
  style,
}: PlacesAutocompleteProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const placesLib = useMapsLibrary('places');
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const dummyMapContainer = useRef<HTMLDivElement>(
    document.createElement('div')
  );

  // Add debounced search value
  const debouncedSearch = useDebounce(searchValue, 300);

  // Initialize services
  useEffect(() => {
    if (!placesLib) return;

    sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    autocompleteService.current = new placesLib.AutocompleteService();
    placesService.current = new placesLib.PlacesService(
      dummyMapContainer.current
    );
  }, [placesLib]);

  // Handle search with debounce
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!autocompleteService.current || debouncedSearch.length < 3) {
        setPredictions([]);

        return;
      }

      const request: google.maps.places.AutocompletionRequest = {
        input: debouncedSearch,
        sessionToken: sessionToken.current || undefined,
        componentRestrictions: { country: 'ua' },
      };

      try {
        const response =
          await autocompleteService.current.getPlacePredictions(request);

        setPredictions(response?.predictions || []);
      } catch {
        setPredictions([]);
      }
    };

    fetchPredictions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, autocompleteService.current]);

  // Handle select
  const handleSelect = useCallback(
    (
      value: string,
      option: { key: string; label: string } | { key: string; label: string }[]
    ) => {
      // Handle both single and array cases
      const selectedOption = Array.isArray(option) ? option[0] : option;

      if (!placesService.current || !selectedOption) return;

      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: selectedOption.key,
        sessionToken: sessionToken.current || undefined,
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === 'OK' && place) {
          setSearchValue(place.formatted_address || '');
          onPlaceSelect(place);
          sessionToken.current =
            new google.maps.places.AutocompleteSessionToken();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placesService.current, onPlaceSelect]
  );

  return (
    <Select
      showSearch
      value={searchValue}
      placeholder="Search address in Ukraine..."
      onSearch={setSearchValue}
      onChange={handleSelect}
      style={style}
      filterOption={false}
      notFoundContent={null}
      loading={debouncedSearch !== searchValue} // Show loading during debounce
    >
      {predictions.map((prediction) => (
        <Option key={prediction.place_id} value={prediction.description}>
          {prediction.description}
        </Option>
      ))}
    </Select>
  );
};
