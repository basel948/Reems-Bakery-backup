import React from "react";
import styles from "./LocationButton.module.css";
import { TfiLocationPin } from "react-icons/tfi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import StandartSwalAlert from "../SwalAlert/StandartSwalAlert";

const LocationButton = ({ onLocationSelect }) => {
  const { t, i18n } = useTranslation();

  const getLocation = () => {
    // console.log("in the getLocation method");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      StandartSwalAlert({
        title: t("Dialoges.browserError"),
        titleText: t("Dialoges.GeolocationNotSupported"),
        icon: "warning",
      });
    }
  };

  const showPosition = async (position) => {
    // console.log("in the showPosition method");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // //if i want to use GOOGLE MAPS API
    // // Replace YOUR_API_KEY with your actual Google Maps Geocoding API key
    // const apiKey = "AIzaSyBuA9ZwURmNVp3uYebnByAPDaKd7tyWHSg";
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    // try {
    //   const response = await fetch(url);
    //   const data = await response.json();

    //   console.log(data);
    //   if (data.status === "OK") {
    //     // The response includes an array of results, you might want to take the first one
    //     const address = data.results[1].formatted_address;
    //     // console.log(address); // This is the full address in a single string

    //     // If you want more detailed components, you can explore the `address_components` array
    //     // in data.results[0] for structured information

    //     // Call onLocationSelect with more detailed information if needed
    //     onLocationSelect(
    //       latitude,
    //       longitude,
    //       data.results[1].address_components[0].long_name,
    //       data.results[1].address_components[1].long_name
    //     );
    //   } else {
    //     console.error("Geocoding failed:", data.status);
    //   }
    // } catch (error) {
    //   console.error("Error fetching address information:", error);
    // }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);

      // Initialize variables for city, town, and suburb
      let city = undefined;
      let town = undefined;
      let suburb = undefined;

      // Check and assign the city, town, and suburb if they exist
      if (data.address) {
        city = data.address.city || undefined;
        town = data.address.town || undefined;
        suburb = data.address.suburb || undefined;
      }

      // Determine the most appropriate label based on available data
      const locationLabel = city || town; // Prefers city over town if both are available

      // console.log(`Suburb: ${suburb}, Location: ${locationLabel}`);

      // Call onLocationSelect with the determined values
      onLocationSelect(latitude, longitude, suburb, locationLabel);
    } catch (error) {
      console.error("Error fetching address information:", error);
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        StandartSwalAlert({
          title: "Dialoges.globalErrorTitle",
          titleText: "Dialoges.GeolocationDenied",
          icon: "error",
        });
        break;
      case error.POSITION_UNAVAILABLE:
        StandartSwalAlert({
          title: "Dialoges.globalErrorTitle",
          titleText: "Dialoges.GeolocationUnavailable",
          icon: "error",
        });
        break;
      case error.TIMEOUT:
        StandartSwalAlert({
          title: "Dialoges.globalErrorTitle",
          titleText: "Dialoges.GeolocationTimeout",
          icon: "error",
        });
        break;
      case error.UNKNOWN_ERROR:
        StandartSwalAlert({
          title: "Dialoges.globalErrorTitle",
          titleText: "Dialoges.globalErrorMsg",
          icon: "error",
        });
        break;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={getLocation}
        className={styles["locationButton"]}
      >
        <TfiLocationPin size={30} />
      </button>
    </div>
  );
};

export default LocationButton;
