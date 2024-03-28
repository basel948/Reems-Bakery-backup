// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import styles from "./ShopingCart.module.css";
import { useLocation } from "react-router-dom";
import { FiPlusCircle, FiMinusCircle, FiArrowLeftCircle } from "react-icons/fi";
import { PiSmileySadBold } from "react-icons/pi";
import { MdOutlineRemoveShoppingCart, MdOutlineHome } from "react-icons/md";
import CheckoutForm from "../UI/CheckoutForm/CheckoutForm";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import emailjs from "@emailjs/browser";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "../Navbar/Navbar";

function ShopingCart() {
  const { t, i18n } = useTranslation(); // Hook for internationalization
  const location = useLocation(); // Access to the current location object
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // State to control checkout form visibility
  const [isCheckoutFormVisible, setCheckoutFormVisible] = useState(false);

  // New state to check if user is logged in
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // State for cart items initialized from localStorage, or empty array if not present
  const [initialCartItems, setInitialCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  // State to store and manage unique items in the cart
  const [uniqueItems, setUniqueItems] = useState({});

  // State to store the total price of items in the cart
  const [totalPrice, setTotalPrice] = useState(0);

  // Populate unique items and their quantities on component mount or when initialCartItems changes
  useEffect(() => {
    const tempUniqueItems = {};
    initialCartItems.forEach((item) => {
      if (tempUniqueItems[item.id]) {
        tempUniqueItems[item.id].quantity += 1;
      } else {
        tempUniqueItems[item.id] = { ...item, quantity: 1 };
      }
    });
    setUniqueItems(tempUniqueItems);
  }, [initialCartItems]);

  useEffect(() => {
    // Check if JWT token exists in localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (showLogin || showRegister) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showLogin, showRegister]);

  // Function to increment or decrement the quantity of an item in the cart
  const updateQuantity = (productId, delta) => {
    setUniqueItems((prev) => {
      const updatedItem = { ...prev[productId] };
      updatedItem.quantity = Math.max(updatedItem.quantity + delta, 1);
      return { ...prev, [productId]: updatedItem };
    });
  };

  // Update the total price when uniqueItems change
  useEffect(() => {
    let newTotalPrice = 0;
    Object.values(uniqueItems).forEach((item) => {
      newTotalPrice += item.price * item.quantity;
    });
    setTotalPrice(newTotalPrice);
  }, [uniqueItems]);

  // Function to display the Checkout form
  const showCheckoutForm = () => {
    console.log("Total Price : " + totalPrice);

    if (isUserLoggedIn) {
      console.log("There is a user Logged in");
      setCheckoutFormVisible(true);
    } else {
      console.log("There is no user logged in");
      setShowLogin(true); // Show the login component if no user is logged in
    }
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    console.log(localStorage.getItem("jwtToken") !== null);
    if (localStorage.getItem("jwtToken") !== null) {
      showCheckoutForm(true);
    }
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    console.log(localStorage.getItem("jwtToken") !== null);
    if (localStorage.getItem("jwtToken") !== null) {
      showCheckoutForm(true);
    }
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  // add user to the database when purchase is successful
  // A Function to update the number of purchased for a specific menuItem
  const updateMenuItemQuantity = async (id, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/menuItems/${id}/purchase?quantity=${quantity}`
      );
    } catch (error) {
      console.error(
        "There was an error updating the number of purchases:",
        error
      );
    }
  };
  // Function to hide the Checkout form
  const closeCheckoutForm = () => {
    setCheckoutFormVisible(false);
  };

  // Function to remove an item entirely from the cart
  const removeItemFromCart = (id) => {
    setUniqueItems((prev) => {
      const newItems = { ...prev };
      delete newItems[id];
      return newItems;
    });

    const updatedCartItems = initialCartItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setInitialCartItems(updatedCartItems);
  };

  const GoToHomePage = () => {
    navigate("/");
  };

  const GoBack = () => {
    navigate(-1);
  };

  const initialOptions = {
    "client-id":
      "AaKIQOlFrbC90oYmFovrCCSnIZ9rOWFAGMzrLyPu9aaFIsX78Iw4YQ8oxKOsb-wIimEaFKGgrXKX1KR9",
    currency: "ILS",
    intent: "capture",
  };

  return (
    <>
      {initialCartItems.length > 0 ? (
        <div className={styles["shopping-cart"]}>
          <Navbar isTransparent={false} />
          <div className={styles["cart-items"]}>
            <h1 className={styles["cart-title"]}>
              {t("ShoppingCart.shopping-cart-title")}
            </h1>

            {/* Mapping over each unique item to create cart item elements */}
            {Object.values(uniqueItems).map((item, index) => (
              <div key={index} className={styles["cart-item"]}>
                <img
                  src={`http://localhost:8080/api/auth/MenuItemsImages/${item.imagePaths[1]}`}
                  alt={i18n.language === "ar" ? item.name_AR : item.name_HE}
                />
                <div className={styles["item-info"]}>
                  <h2>
                    {i18n.language === "ar" ? item.name_AR : item.name_HE}
                  </h2>
                  <p>
                    {i18n.language === "ar"
                      ? item.description_AR
                      : item.description_HE}
                  </p>
                  <h3>
                    {t("ShoppingCart.price")} {item.price}₪{" "}
                  </h3>
                  <div className={styles["quantity-control"]}>
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      <FiMinusCircle size={30} color="red" />
                    </button>
                    <span className={styles["quantity-number"]}>
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      <FiPlusCircle size={30} color="green" />
                    </button>
                  </div>
                  <h4>
                    {t("ShoppingCart.price-for")}
                    {item.quantity === 1
                      ? t("ShoppingCart.item")
                      : `${item.quantity} ${t("ShoppingCart.items")}`}
                    {item.price * item.quantity}
                  </h4>
                </div>
                <button
                  className={styles["remove-item"]}
                  onClick={() => {
                    removeItemFromCart(item.id);
                  }}
                >
                  {t("ShoppingCart.remove-items")}
                </button>
              </div>
            ))}
          </div>

          <div className={styles["cart-summary"]}>
            <h3 className={styles["total-price"]}>
              {t("ShoppingCart.total-price")} {totalPrice}₪
            </h3>
            <button
              className={styles["checkout-btn"]}
              onClick={showCheckoutForm}
            >
              {t("ShoppingCart.to-checkout")}
            </button>
            <Login
              show={showLogin}
              onClose={() => {
                handleCloseLogin();
                setIsUserLoggedIn(true); // Set user logged in state to true after successful login
              }}
              switchToRegister={switchToRegister}
            />
            <Register
              show={showRegister}
              onClose={handleCloseRegister}
              switchToLogin={switchToLogin}
            />
          </div>
          {/* Conditional rendering of the CheckoutForm component */}
          {isCheckoutFormVisible ? (
            <PayPalScriptProvider options={initialOptions}>
              <div className={styles["overlay"]}>
                <CheckoutForm
                  onClose={closeCheckoutForm}
                  totalPrice={totalPrice}
                  cartItems={Object.values(uniqueItems)} //uniqueItems converted to an array so we can map throught it in the checkout form component
                />
                {/* Passed the onClose prop */}
              </div>
            </PayPalScriptProvider>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={styles["empty-cart-container"]}>
          <div>
            <button onClick={GoToHomePage} className={styles["GoToHomeBtn"]}>
              <MdOutlineHome size={35} />
            </button>
            <button onClick={GoBack} className={styles["GoBackBtn"]}>
              <FiArrowLeftCircle size={30} />
            </button>
          </div>

          <MdOutlineRemoveShoppingCart size={150} />
          <h1>
            <PiSmileySadBold />

            {t("ShoppingCart.empty-cart")}
            <PiSmileySadBold />
          </h1>
        </div>
      )}
    </>
  );
}

export default ShopingCart;
