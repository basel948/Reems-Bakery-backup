import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./UserAddress.module.css";
import LocationButton from "../UI/LocationButton/LocationButton";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import LocationMap from "../UI/LocationMap/LocationMap";
import Swal from "sweetalert2";
import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";

const UserAddress = () => {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { t, i18n } = useTranslation();
  const savedAddress = useSelector((state) => state.user.savedAddress);

  const handleAddressUpdate = (updatedAddress) => {
    setShow(true);
  };

  const handleAddressDelete = () => {
    setShowDialog(true);
  };

  const handleDialogClose = (userResponse) => {
    setShowDialog(false);
    if (userResponse === "agree") {
      setSavedAddress(null);
      setShow(true);
    }
  };

  return (
    <div className={styles["useraddress"]}>
      <div className={styles["addressin"]}>
        {!show && <h1 className={styles["mainhead"]}>Your Main Address</h1>}
        {!show && (
          <div className={styles["addresscontainer"]}>
            <div className={styles["map-container"]}>
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
        )}

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
        {showDialog &&
          StandartSwalAlert({
            title: t("Dialoges.confirmDeletionTitle"),
            titleText: t("Dialoges.confirmDeletionText"),
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: t("Dialoges.delete"),
            cancelButtonText: t("Dialoges.cancel"),
            showClass: {
              popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
            },
            hideClass: {
              popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
            },
          })}
      </div>
    </div>
  );
};

export default UserAddress;
