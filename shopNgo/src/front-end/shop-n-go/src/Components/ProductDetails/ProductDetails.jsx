import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ProductDetails.module.css";
import SlpashScreen from "../SplashScreen/SlpashScreen";
import FanFavouriteItems from "../FanFavouriteItems/FanFavouriteItems";
import ContactUs from "../ContactUs/ContactUs";
import InnerSlider from "../Slider/InnerSlider";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import AlertDialogSlide from "../UI/AlertDialog/AlertDialog";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showLoading, setLoading] = useState(true);
  const categories = useSelector((state) => state.categories.categories);

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return JSON.parse(savedCartItems) || [];
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!product) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/api/auth/menuItems/${id}`
          );
          setProduct(response.data);
        } catch (error) {
          alert("Error fetching product:", error);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id, product]);

  useEffect(() => {
    if (location.state?.product) {
      setLoading(true);
      setProduct(location.state.product);
      setLoading(false);
    }
  }, [location.state?.product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const productImageArray = product?.imagePaths.map(
    (imagePath) => `http://localhost:8080/api/auth/MenuItemsImages/${imagePath}`
  );

  let extraText = "";
  if (["كعكة", "فطائر"].includes(product?.categoryName)) {
    extraText = `( تكفي ل ${product?.numberOfServings} قطع )`;
  } else if (["براونيز", "مافنز", "بسكويت"].includes(product?.categoryName)) {
    extraText = `( تحتوي على  ${product?.numberOfServings} قطع )`;
  }

  const handleDialogClose = (userResponse) => {
    setShowDialog(false);
    if (userResponse === "agree") {
      navigate("/shopingCart", { state: { cartItems } });
    }
  };

  const addToShopingCart = (productDetails) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, productDetails];
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return newCartItems;
    });
    setShowDialog(true);
  };

  if (showLoading) {
    return <SlpashScreen />;
  }

  return (
    <div className={styles["container"]}>
      <Navbar isTransparent={false} />
      <header className={styles["header"]}>
        <div className={styles["right-section"]}>
          <div className={styles["product-details-top"]}>
            <h3 className={styles["product-category"]}>
              {i18n.language === "ar"
                ? product?.categoryName_AR
                : product?.categoryName_HE}
            </h3>
            <h1 className={styles["product-title"]}>
              {i18n.language === "ar" ? product?.name_AR : product?.name_HE}
              <span className={styles["extraText"]}>{extraText}</span>
            </h1>
            <h2 className={styles["product-description"]}>
              {i18n.language === "ar"
                ? product?.description_AR
                : product?.description_HE}
            </h2>
          </div>
          <div className={styles["product-details-bottom"]}>
            <h3 className={styles["product-price"]}>{product?.price} ₪</h3>
            <button
              id="add-to-buy-list-btn"
              className={styles["add-to-buy-list-btn"]}
              onClick={() => addToShopingCart(product)}
            >
              <span className={styles["text"]}>
                {t("productDetails.add-to-buy-list-btn")}
              </span>{" "}
              <BsCart4 size={35} />
            </button>
          </div>
          <div className={styles["allergies-section"]}>
            <h1 id="allergies">{t("productDetails.allergies")}</h1>
            <h6>
              <span
                id="product-allergies-contains"
                className={styles["product-allergies-contains"]}
              >
                {t("productDetails.product-allergies-contains")}
              </span>
              <span className={styles["product-allergies-components"]}>
                {i18n.language === "ar"
                  ? product?.ingredients_AR.join(" , ")
                  : product?.ingredients_HE.join(" , ")}
              </span>
            </h6>
          </div>
        </div>
        <div className={styles["left-section"]}>
          <InnerSlider productImages={productImageArray} />
        </div>
      </header>
      <footer>
        <FanFavouriteItems currentProduct={product} />
        <ContactUs />
      </footer>
      {showDialog && (
        <AlertDialogSlide
          open={showDialog}
          onClose={handleDialogClose}
          dialogeTitle={t("AlertDialog.dialoge-title1")}
          dialogContentText={t("AlertDialog.dialoge-description1")}
          disagreeButton={t("AlertDialog.continue-shopping")}
          agreeButton={t("AlertDialog.to-checkout")}
        />
      )}
    </div>
  );
}

export default ProductDetails;
