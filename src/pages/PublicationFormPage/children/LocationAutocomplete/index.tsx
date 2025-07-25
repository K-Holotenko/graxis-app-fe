import { useState, useEffect, useRef, useCallback } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { AutoComplete, ConfigProvider, Form } from 'antd';
import { useLocation } from 'react-router-dom';

import logo from 'src/assets/images/google_on_white.png';
import MapIcon from 'src/assets/icons/map-pin-icon-autocomplete.svg?react';
import { useDebounce } from 'src/hooks/useDebounce';
import { theme } from 'src/config/theme';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';
import { formatLocation, getLocationValue } from './utils/utils';

const { Option } = AutoComplete;

interface LocationAutocompleteProps {
  isLocationPicked: boolean;
}

export const LocationAutocomplete = ({
  isLocationPicked,
}: LocationAutocompleteProps) => {
  const form = Form.useFormInstance();
  const location = useLocation();
  const isEdit = location.pathname.includes('edit-publication');

  const [hasManuallyEdited, setHasManuallyEdited] = useState(false);

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
        types: ['address'],
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
  }, [debouncedSearch, autocompleteService.current]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setHasManuallyEdited(true);

    // We accept only the value user selected from dropdown
    form.setFieldsValue({ location: undefined });
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
        fields: [
          'name',
          'formatted_address',
          'geometry',
          'place_id',
          'address_components',
        ],
        language: 'uk',
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === 'OK' && place) {
          setSearchValue(place.formatted_address || value);

          const formattedLocation = formatLocation(place);

          form.setFieldsValue({ location: formattedLocation });

          sessionToken.current =
            new google.maps.places.AutocompleteSessionToken();
        }
      });
    },
    [placesService.current]
  );

  const localTheme = setLocalTheme(isLocationPicked);
  const showError = hasManuallyEdited && !isLocationPicked;

  return (
    <ConfigProvider theme={localTheme}>
      <AutoComplete
        className={`
    ${styles.searchBox}
    ${showError ? styles.error : ''}
  `}
        popupClassName={styles.popUp}
        value={getLocationValue(searchValue, form, isEdit)}
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
      <p
        className={`${styles.helperText} ${showError ? styles.helperTextError : ''}`}
      >
        Почніть вводити адресу та оберіть відповідний варіант із списку, що
        з’явиться.
      </p>
    </ConfigProvider>
  );
};

const setLocalTheme = (isLocationPicked: boolean) => ({
  components: {
    Select: {
      borderRadius: 8,
      colorBorder: isLocationPicked ? theme.success : theme.N3,
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
});
