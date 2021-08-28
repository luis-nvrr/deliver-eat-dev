import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

const Map = ({ setAddress }) => {
  const center = { lat: -31.427556, lng: -64.1882 };
  const [marker] = React.useState(center);

  const onMarkerDragEnd = async (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyD1nHGlzuM_MajZHaLP5yFUks0wjGMZ9kI`,
    );
    const number =
      response.data.results[0].address_components[0].long_name;
    const street =
      response.data.results[0].address_components[1].short_name;
    const city = response.data.results[3].formatted_address;
    setAddress({ street, number, city });
    console.log(street, number, city);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD1nHGlzuM_MajZHaLP5yFUks0wjGMZ9kI">
      <GoogleMap center={center} zoom={15}>
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
};

Map.propTypes = {
  setAddress: PropTypes.func.isRequired,
};

export default Map;
