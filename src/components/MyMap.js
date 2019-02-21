import React from 'react';
import Card from '@material-ui/core/Card';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';


const MyMap = withScriptjs(
  withGoogleMap(({ latitude, longitude }) => {
    const defaultProps = {
      center: {
        lat: 31.11,
        lng: -100
      },
      zoom: 4
    };
    return (
      <Card>
        <GoogleMap
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}>
          <Marker
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
          />
        </GoogleMap>
      </Card>
    );
  })
);

export default MyMap;
