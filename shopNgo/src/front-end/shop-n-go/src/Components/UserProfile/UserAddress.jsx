import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
import { AppContext } from "../../AppProvider";
import styles from "./UserAddress.module.css";
import LocationButton from "../UI/LocationButton/LocationButton";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import LocationMap from "../UI/LocationMap/LocationMap";
import AlertDialogSlide from "../UI/AlertDialog/AlertDialog";

const UserAddress = () => {
  const [show, setShow] = useState(false);
  const [savedAddress, setSavedAddress] = useState({
    latitude: 32.5416071,
    longitude: 35.160425,
    city: "Umm Al-Fahem",
    address: "Al-Thoraya 19",
    moreInfo: "Neghbours of Amir",
  });
  const [showDialog, setShowDialog] = useState(false);
  const { t, i18n } = useTranslation();

  const [newlatitude, setNewLatitude] = useState();
  const [newlongitude, setNewLongitude] = useState();
  const [newCity, setNewCity] = useState();
  const [newStreet, setNewStreet] = useState();
  const [newMoreinfo, setNewMoreinfo] = useState();

  const handleAddressUpdate = (updatedAddress) => {
    setShow(true);
  };

  const handleAddressDelete = () => {
    // Logic to delete address in the backend
    // Remove address from localStorage
    // here we also should delete the address from the backend
    // or make them null
    setShowDialog(true);
  };

  // Handle dialog close event
  const handleDialogClose = (userResponse) => {
    setShowDialog(false);
    if (userResponse === "agree") {
      // Perform deletion logic
      setSavedAddress(null);

      setShow(true);

      // Add additional deletion logic here
    }
  };
  return (
    <div className={styles["useraddress"]}>
      <div className={styles["addressin"]}>
        {!show && <h1 className={styles["mainhead"]}>Your Main Address</h1>}
        {
          !show && (
            //   savedAddress.map((item, index) => {
            //     return (
            <div className={styles["addresscontainer"]}>
              <div className={styles["map-container"]}>
                {/* Add LocationMap component here */}
                <LocationMap
                  latitude={savedAddress.latitude}
                  longitude={savedAddress.longitude}
                />
              </div>
              <div className={styles["details-container"]}>
                <div className={styles["address-details"]}>
                  <span>{savedAddress.city}</span>
                  <span>{savedAddress.address}</span>
                  <span>{savedAddress.moreInfo}</span>
                </div>
              </div>
            </div>
          )
          //     );
          //   })
        }

        {!show && (
          <div className={styles["actionbtns-group"]}>
            <div className={styles["actionbtns"]}>
              <Button
                variant="outlined"
                style={{
                  margin: "10px",
                  color: "white",
                  borderColor: "green",
                  backgroundColor: "#008729",
                  gap: "15px",
                }}
                onClick={() => {
                  handleAddressUpdate();
                }}
              >
                Update Location <RxUpdate size={23} />
              </Button>

              <Button
                variant="outlined"
                style={{
                  margin: "10px",
                  color: "white",
                  borderColor: "red",
                  backgroundColor: "#E3170A",
                  gap: "15px",
                }}
                onClick={() => {
                  // here we should display a small dialog to make sure of delete the location
                  handleAddressDelete();
                }}
              >
                Delete Location <RiDeleteBinFill size={23} />
              </Button>
            </div>
          </div>
        )}

        {show && savedAddress === null && (
          <div className={styles["newaddress"]}>
            <h1 className={styles["mainhead"]}>Add New Address</h1>
            <div className={styles["form"]}>
              <div
                className={`${styles["inputContainer"]}  ${styles["form-location-button"]} ${styles["locationButton"]}`}
              >
                <h1 className={styles["locationButtonText"]}>
                  أدخل موقعك الحالي <span>*</span>
                </h1>
                <LocationButton />
              </div>

              {/* address and City input fields */}
              <div className={styles["form-group"]}>
                <label htmlFor="address">address Name</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={styles.inputField}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="city">City Name</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={styles.inputField}
                />
              </div>

              {/* More Info input field with larger size */}
              <div
                className={`${styles["form-group"]} ${styles["more-info-group"]}`}
              >
                <label htmlFor="moreinfo">More Information</label>
                <textarea rows="4" name="moreinfo" id="moreinfo"></textarea>
              </div>
            </div>
            <div className={styles["button-container"]}>
              <button className={styles["mainButton"]} onClick={() => {}}>
                Save Address
              </button>
            </div>
          </div>
        )}

        {show && savedAddress && (
          <div className={styles["newaddress"]}>
            <h1 className={styles["mainhead"]}>Add New Address</h1>
            <div className={styles["form"]}>
              <div
                className={`${styles["inputContainer"]}  ${styles["form-location-button"]} ${styles["locationButton"]}`}
              >
                <h1 className={styles["locationButtonText"]}>
                  أدخل موقعك الحالي <span>*</span>
                </h1>
                <LocationButton />
              </div>

              {/* address and City input fields */}
              <div className={styles["form-group"]}>
                <label htmlFor="address">address Name</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={styles.inputField}
                  placeholder={savedAddress.address}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="city">City Name</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={styles.inputField}
                  placeholder={savedAddress.city}
                />
              </div>

              {/* More Info input field with larger size */}
              <div
                className={`${styles["form-group"]} ${styles["more-info-group"]}`}
              >
                <label htmlFor="moreinfo">More Information</label>
                <textarea
                  rows="4"
                  name="moreinfo"
                  id="moreinfo"
                  className={styles.inputField}
                  placeholder={savedAddress.moreInfo}
                ></textarea>
              </div>
            </div>
            <div className={styles["button-container"]}>
              <button className={styles["mainButton"]} onClick={() => {}}>
                Save Address
              </button>
              <button
                className={styles["mainButton"]}
                onClick={() => {
                  setShow(false);
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}
        {showDialog && (
          <AlertDialogSlide
            open={showDialog}
            onClose={handleDialogClose}
            dialogeTitle={t("AlertDialog.dialoge-title2")}
            dialogContentText={t("AlertDialog.dialoge-description2")}
            disagreeButton={t("AlertDialog.cancel")}
            agreeButton={t("AlertDialog.delete")}
          />
        )}
      </div>
    </div>
  );
};

export default UserAddress;
