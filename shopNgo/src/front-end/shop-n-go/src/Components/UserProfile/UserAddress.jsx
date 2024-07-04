import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./UserAddress.module.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdMap } from "react-icons/md";
import { FaEdit, FaHome } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import LocationMap from "../UI/LocationMap/LocationMap";
import LocationButton from "../UI/LocationButton/LocationButton";
import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";
import {
  createLocation,
  updateLocation,
  deleteLocation,
  fetchCurrentUser,
} from "../../Redux/features/userSlice";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const UserAddress = () => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentMapIndex, setCurrentMapIndex] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    moreInfo: "",
    latitude: null,
    longitude: null,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [locationType, setLocationType] = useState("Home");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userLocations = useSelector((state) => state.user.userData.locations);
  const userId = useSelector((state) => state.user.userData.id);

  useEffect(() => {
    if (!show) {
      setFormData({
        address: "",
        city: "",
        moreInfo: "",
        latitude: null,
        longitude: null,
      });
      setIsEdit(false);
      setEditIndex(null);
    }
  }, [show]);

  useEffect(() => {
    if (currentLocation) {
      setFormData((prevData) => ({
        ...prevData,
        address: currentLocation.address,
        city: currentLocation.city,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }));
    }
  }, [currentLocation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressOnMap = (index) => {
    if (currentMapIndex === index) {
      setCurrentMapIndex(null);
    } else {
      setCurrentMapIndex(index);
    }
  };

  const handleAddressUpdate = (index) => {
    const location = userLocations[index];
    setFormData({
      address: location.address,
      city: location.city,
      moreInfo: location.moreInfo,
      latitude: location.latitude,
      longitude: location.longitude,
      type: location.type,
    });
    setIsEdit(true);
    setEditIndex(index);
    setShow(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const locationData = {
      ...formData,
      latitude: formData.latitude,
      longitude: formData.longitude,
      type: locationType,
    };

    if (isEdit) {
      dispatch(updateLocation({ userId, index: editIndex, locationData })).then(
        () => {
          dispatch(fetchCurrentUser());
          setShow(false);
          StandartSwalAlert({
            title: t("Dialoges.updatedSeccessfullyTitle"),
            text: t("Dialoges.updatedSeccessfullyMsg"),
            icon: "success",
          });
        }
      );
    } else {
      dispatch(createLocation({ userId, locationData })).then(() => {
        dispatch(fetchCurrentUser());
        setShow(false);
        StandartSwalAlert({
          title: t("Dialoges.createdLocationSuccessfullyTitle"),
          text: t("Dialoges.createdLocationSuccessfullyMsg"),
          icon: "success",
        });
      });
    }
  };

  const handleAddLocation = () => {
    setShow(true);
  };

  const handleAddressDelete = (index) => {
    StandartSwalAlert({
      title: t("Dialoges.deleteLocationTitle"),
      text: t("Dialoges.deleteLocationMsg"),
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: t("Dialoges.delete"),
      cancelButtonText: t("Dialoges.cancel"),
      timer: null,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLocation({ userId, index })).then(() => {
          dispatch(fetchCurrentUser());
          StandartSwalAlert({
            title: t("Dialoges.deletedSuccessfullyTitle"),
            text: t("Dialoges.locationDeletedSuccessfullyMsg"),
            icon: "success",
          });
        });
      }
    });
  };
  const handleLocation = (latitude, longitude, address, city) => {
    setCurrentLocation({ latitude, longitude, address, city });
  };

  return (
    <div className={styles["useraddress"]}>
      <div className={styles["addressin"]}>
        {!show && (
          <>
            {userLocations.length === 0 ? (
              <div className={styles["noAddressContainer"]}>
                <h1 className={styles["mainhead"]}>
                  {t("UserAddress.noAddresses")}
                </h1>
                <button
                  className={styles["mainButton"]}
                  onClick={handleAddLocation}
                >
                  {t("UserAddress.addAddress")}
                </button>
              </div>
            ) : (
              <>
                <h1 className={styles["mainhead"]}>
                  {t("UserAddress.savedAddresses")}
                </h1>
                {userLocations.map((location, index) => (
                  <div key={index} className={styles["addresscontainer"]}>
                    <div className={styles["rightside-container"]}>
                      <div className={styles["address-details"]}>
                        <span style={{ fontWeight: "bold" }}>
                          {location.type === "Home" ? (
                            <FaHome size={23} style={{ marginLeft: "8px" }} />
                          ) : (
                            <HiOutlineBuildingOffice2
                              size={23}
                              style={{ marginLeft: "8px" }}
                            />
                          )}
                          {location.type}
                        </span>
                        <span>{location.city}</span>
                        <span>{location.address}</span>
                        <span>{location.moreInfo}</span>
                      </div>
                    </div>
                    <div className={styles["middleside-container"]}>
                      {currentMapIndex === index && (
                        <LocationMap
                          latitude={location.latitude}
                          longitude={location.longitude}
                        />
                      )}
                    </div>
                    <div className={styles["leftside-container"]}>
                      <div className={styles["actionbtns-group"]}>
                        <Button
                          variant="outlined"
                          style={{
                            margin: "10px",
                            color: "white",
                            borderColor: "green",
                            width: "200px",
                            backgroundColor: "#008729",
                            gap: "15px",
                          }}
                          onClick={() => handleAddressUpdate(index)}
                        >
                          {t("UserAddress.editAddress")} <FaEdit size={23} />
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            width: "200px",
                            margin: "10px",
                            color: "white",
                            borderColor: "blue",
                            backgroundColor: "#007BFF",
                            gap: "15px",
                          }}
                          onClick={() => handleAddressOnMap(index)}
                        >
                          {currentMapIndex === index
                            ? t("UserAddress.removeMap")
                            : t("UserAddress.showOnMap")}{" "}
                          <MdMap size={23} />
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            margin: "10px",
                            color: "white",
                            borderColor: "red",
                            width: "200px",
                            backgroundColor: "#E3170A",
                            gap: "15px",
                          }}
                          onClick={() => handleAddressDelete(index)}
                        >
                          {t("UserAddress.deleteAddress")}{" "}
                          <RiDeleteBinFill size={23} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className={styles["mainButton"]}
                  onClick={handleAddLocation}
                >
                  {t("UserAddress.addAddress")}
                </button>
              </>
            )}
          </>
        )}

        {show && (
          <div className={styles["newaddress"]}>
            <h1 className={styles["mainhead"]}>
              {isEdit
                ? t("UserAddress.editAddress")
                : t("UserAddress.addNewAddress")}
            </h1>
            <form className={styles["form"]} onSubmit={handleFormSubmit}>
              <div
                className={styles["row-group"]}
                style={{ gridColumn: "span 2" }}
              >
                <div
                  className={`${styles["inputContainer"]}  ${styles["locationButton"]}`}
                >
                  <h1 className={styles["locationButtonText"]}>
                    {t("UserAddress.enterCurrentLocation")} <span>*</span>
                  </h1>
                  <LocationButton onLocationSelect={handleLocation} />
                </div>
                <div className={styles["form-group"]}>
                  <FormControl
                    component="fieldset"
                    className={styles["form-control"]}
                  >
                    <FormLabel
                      component="legend"
                      className={styles["form-label"]}
                    >
                      نوع الموقع
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="locationType"
                      name="locationType"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                      className={styles["radio-group"]}
                    >
                      <FormControlLabel
                        value="Home"
                        control={<Radio />}
                        label="البيت"
                      />
                      <FormControlLabel
                        value="Work"
                        control={<Radio />}
                        label="العمل"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="أخرى"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="address"> {t("UserAddress.address")}</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={styles.inputField}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="city"> {t("UserAddress.city")}</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={styles.inputField}
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div
                className={`${styles["form-group"]} ${styles["more-info-group"]}`}
                style={{ gridColumn: "span 2" }}
              >
                <label htmlFor="moreInfo"> {t("UserAddress.moreInfo")}</label>
                <textarea
                  rows="4"
                  name="moreInfo"
                  id="moreInfo"
                  placeholder={formData.moreInfo}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div
                className={styles["button-container"]}
                style={{ gridColumn: "span 2" }}
              >
                <button type="submit" className={styles["mainButton"]}>
                  {isEdit
                    ? t("UserAddress.saveEditedAddress")
                    : t("UserAddress.addAddress")}
                </button>
                <button
                  type="button"
                  className={styles["mainButton"]}
                  onClick={() => setShow(false)}
                >
                  {t("UserAddress.back")}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddress;
