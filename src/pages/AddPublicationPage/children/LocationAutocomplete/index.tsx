import { useState, useEffect, useRef, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { AutoComplete, ConfigProvider } from 'antd';

import logo from 'src/assets/images/google_on_white.png';
import MapIcon from 'src/assets/icons/map-pin-icon-autocomplete.svg?react';
import { useDebounce } from 'src/hooks/useDebounce';
import { theme } from 'src/config/theme';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

interface LocationAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const { Option } = AutoComplete;

export const LocationAutocomplete = ({
  onPlaceSelect,
}: LocationAutocompleteProps) => {
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

  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    if (!placesLib) return;

    sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    autocompleteService.current = new placesLib.AutocompleteService();
    placesService.current = new placesLib.PlacesService(
      dummyMapContainer.current
    );
  }, [placesLib]);

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
        language: 'uk',
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

  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      onPlaceSelect(null);
    }
  };

  const handleSelect = useCallback(
    (
      value: string,
      option: { key: string; label: string } | { key: string; label: string }[]
    ) => {
      const selectedOption = Array.isArray(option) ? option[0] : option;

      if (!placesService.current || !selectedOption) return;

      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: selectedOption.key,
        sessionToken: sessionToken.current || undefined,
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
        language: 'uk',
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === 'OK' && place) {
          setSearchValue(place.formatted_address || value);
          const location = place.geometry?.location;

          onPlaceSelect({
            ...place,
            geometry: {
              location: {
                lat: location?.lat(),
                lng: location?.lng(),
              },
            },
          } as google.maps.places.PlaceResult & {
            geometry: { location: { lat: number; lng: number } };
          });

          sessionToken.current =
            new google.maps.places.AutocompleteSessionToken();
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placesService.current, onPlaceSelect]
  );

  return (
    <ConfigProvider theme={localTheme}>
      <AutoComplete
        className={styles.searchBox}
        popupClassName={styles.popUp}
        value={searchValue}
        showSearch
        placeholder={TEXT.ENTER_LOCATION}
        suffixIcon={<MapIcon />}
        onSearch={handleSearch}
        onSelect={handleSelect}
        filterOption={false}
      >
        {predictions.map((prediction) => (
          <Option key={prediction.place_id} value={prediction.description}>
            {prediction.description}
          </Option>
        ))}
        {predictions.length > 0 && (
          <Option
            key="powered-by-google"
            disabled
            className={styles.googleLogo}
          >
            <div className={styles.googleAttribution}>
              <span>powered by</span>
              <img
                className={styles.googleLogoImg}
                src={logo}
                alt="Powered by Google"
              />
            </div>
          </Option>
        )}
      </AutoComplete>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Select: {
      borderRadius: 8,
      colorBorder: theme.N3,
      hoverBorderColor: theme.N4,
      fontSize: 12,
      colorPrimary: theme.N5,
      controlOutline: 'none',
      colorText: theme.N6,
      optionHeight: 39,
      optionPadding: '10px 12px',
      optionActiveBg: theme.N2,
      optionSelectedFontWeight: 400,
    },
  },
};
