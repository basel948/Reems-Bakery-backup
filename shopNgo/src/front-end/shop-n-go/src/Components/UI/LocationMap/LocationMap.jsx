import React from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "../MapMarker/MapMarker";

function LocationMap({ latitude, longitude }) {
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 16,
  };

  console.log("Latitude: ", latitude);
  console.log("Longitude: ", longitude);
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "200px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyARuyMKFs2ctGWK6WtCIV92wCKToFAcCJw",
          language: "ar",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        draggable={false}
      >
        <MapMarker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
}

export default LocationMap;
