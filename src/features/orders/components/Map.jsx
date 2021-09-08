import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import levenshtein from 'fast-levenshtein';

const MyMap = ({ marker, onMarkerDragEnd }) => (
  <LoadScript googleMapsApiKey="AIzaSyD1nHGlzuM_MajZHaLP5yFUks0wjGMZ9kI">
    <GoogleMap center={marker} zoom={15}>
      <Marker
        key={12345}
        position={marker}
        onDragEnd={onMarkerDragEnd}
        draggable
      />
      <></>
    </GoogleMap>
  </LoadScript>
);

const findClosestMatch = (data) => {
  const validCities = [
    {
      id: 1,
      name: 'Ciudad de Córdoba',
    },
    {
      id: 2,
      name: 'Río Primero',
    },
    {
      id: 3,
      name: 'Villa Carlos Paz',
    },
  ];
  const distances = validCities.map((city, id) => ({
    id,
    distance: levenshtein.get(city.name, data),
    city: city.name,
  }));
  const sorted = distances.sort((a, b) => a.distance - b.distance);
  return sorted[0].city;
};

const Map = ({ setValue, watch, setSelectedCity }) => {
  const center = { lat: -31.427556, lng: -64.1882 };
  const [marker, setMarker] = React.useState(center);
  const street = watch('destinationStreet');
  const number = watch('destinationNumber');
  const city = watch('destinationCity');

  const address =
    street && number && city ? `${number} ${street}, ${city}` : '';

  const onMarkerDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyD1nHGlzuM_MajZHaLP5yFUks0wjGMZ9kI`,
    );
    console.log(response);

    const responseStreet =
      response.data.results[0].address_components[1].long_name;
    const responseNumber =
      response.data.results[0].address_components[0].long_name;
    const responseCity =
      response.data.results[0].plus_code.compound_code;

    const closestMatchCity = findClosestMatch(responseCity);

    setValue('destinationStreet', responseStreet, {
      shouldValidate: true,
    });
    setValue('destinationNumber', responseNumber, {
      shouldValidate: true,
    });
    setSelectedCity(closestMatchCity);
  };

  React.useEffect(async () => {
    if (!address) return;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD1nHGlzuM_MajZHaLP5yFUks0wjGMZ9kI`,
    );

    if (response.data.results === 0) return;
    const { lat, lng } = response.data.results[0].geometry.location;

    setMarker({ lat, lng });
  }, [address]);

  return <MyMap marker={marker} onMarkerDragEnd={onMarkerDragEnd} />;
};

MyMap.propTypes = {
  marker: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired,
};

Map.propTypes = {
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};

export default Map;
