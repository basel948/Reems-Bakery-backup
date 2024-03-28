import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { IoMdExit } from "react-icons/io";
import { PayPalButtons } from "@paypal/react-paypal-js";
import SmallCard from "../Card/SmallCard";
import deliveryIMG from "../../../assets/fast-delivery.png";
import pickupIMG from "../../../assets/take-away.png";

function CheckoutForm({ onClose, totalPrice, cartItems }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const createOrder = () => {
    console.log(cartItems);
    if (!Array.isArray(cartItems)) return; // if not an array then return
    const requestBody = {
      items: cartItems.map((item) => ({
        name: item.name_HE, // or item.name_AR / item.name_HE based on i18n
        cost: item.price.toString(),
        quantity: item.quantity,
      })),
      totalPrice: totalPrice.toString(),
    };

    console.log(requestBody);
    return fetch("http://localhost:8080/api/auth/paypal/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((order) => {
        console.log(order);
        if (order.id) {
          return order.id; // Ensure that this is the format PayPal expects
        } else {
          throw new Error("Order ID not found");
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    console.log(data);
    return fetch("http://localhost:8080/api/auth/paypal/capture-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  return (
    <div className={styles["overlay"]}>
      <div className={styles["form-container"]}>
        <div className={styles["cards-container"]}>
          <SmallCard
            title={"Delivery"}
            img={deliveryIMG}
            isSelected={selectedCard === "Delivery"}
            onClick={() => handleCardClick("Delivery")}
          />
          <SmallCard
            title={"Pickup"}
            img={pickupIMG}
            isSelected={selectedCard === "Pickup"}
            onClick={() => handleCardClick("Pickup")}
          />
        </div>
        <div className={styles["close-button"]} onClick={onClose}>
          <IoMdExit size={25} />
        </div>

        {selectedCard === "Delivery" ? (
          <div className={styles["client-location"]}>
            <h1>
              SHOW CLIENT LOCATION , AND A BUTTON TO ADD NEW LOCATION IF HE
              WANTS
            </h1>
          </div>
        ) : (
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        )}
      </div>
    </div>
  );
}
export default CheckoutForm;
