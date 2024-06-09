import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.css";
import { LuArrowLeftSquare } from "react-icons/lu";
import { PayPalButtons } from "@paypal/react-paypal-js";
import DeliveryMethods from "../DeliveryMethods/DeliveryMethods";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import Modal from "../Modal/Modal";
import LocationMap from "../LocationMap/LocationMap";
import { useSelector } from "react-redux";
function CheckoutForm({ onClose, totalPrice, cartItems }) {
  useEffect(() => {
    // Add class to body when modal is open
    document.body.classList.add(styles.modalOpen);

    // Remove class from body when modal is closed
    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, []);

  console.log("Cart Items: ", cartItems);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  console.log("User Data: ", userData);
  const PaymentMethodChoosen = (option) => {
    setSelectedPaymentMethod(option);
  };

  const DeliveryMethodChoosen = (option) => {
    setSelectedDeliveryMethod(option);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles["checkoutForm"]}>
        <div className={styles["header"]}>
          <h2>قسم الدفع</h2>

          <LuArrowLeftSquare
            onClick={onClose}
            className={styles["closeIcon"]}
          />
        </div>
        <DeliveryMethods DeliveryMethodChoosen={DeliveryMethodChoosen} />
        <PaymentMethods PaymentMethodChoosen={PaymentMethodChoosen} />

        {selectedDeliveryMethod === "delivery" && (
          <div className={styles["map"]}>
            <LocationMap
              latitude={userData.location.latitude}
              longitude={userData.location.longitude}
            />
          </div>
        )}

        <h3 className={styles["total"]}>Total: {totalPrice} ₪</h3>

        {selectedPaymentMethod === "credit" && (
          <div className={styles["summary"]}>
            <PayPalButtons style={{ layout: "vertical" }} />
          </div>
        )}
        <button className={styles["submitButton"]}>أدفع</button>
      </div>
    </Modal>
  );
}
export default CheckoutForm;
