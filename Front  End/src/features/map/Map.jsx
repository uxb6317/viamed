import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

/* 
  Renders a simple google map
  center: {lat, long}
*/

const Map = ({ center }) => {
  return (
    <GoogleMap
      center={center}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={14}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
