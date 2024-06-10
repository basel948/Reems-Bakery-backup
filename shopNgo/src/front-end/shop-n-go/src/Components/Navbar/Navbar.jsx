import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/features/userSlice";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StandartSwalAlert from "../UI/SwalAlert/StandartSwalAlert";

const Navbar = ({ isTransparent }) => {
  const [scroll, setScroll] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const isThereAUser = useSelector((state) => !!state.user.userData);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const shortCategoriesNames =
    categories?.map((item) =>
      i18n.language === "ar" ? item.name_AR : item.name_HE
    ) || [];
  const extendedCategoriesNamesAR = ["كل القائمة", ...shortCategoriesNames];
  const extendedCategoriesNamesHE = ["כל התפריט", ...shortCategoriesNames];

  const navigateToMenu = (category) => {
    navigate(`/menu?category=${encodeURIComponent(category)}`);
    handleMenuItemClose();
  };

  const handleMenuItemClick = (event) => setMenuAnchorEl(event.currentTarget);

  const handleMenuItemClose = () => setMenuAnchorEl(null);

  const checkScroll = () => setScroll(window.scrollY > 50);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  let navbarStyle = {
    backgroundColor: scroll ? "black" : isTransparent ? "transparent" : "black",
  };

  const handleUserMenuClick = (event) =>
    setUserMenuAnchorEl(event.currentTarget);

  const handleUserMenuClose = () => setUserMenuAnchorEl(null);

  const handleSignOut = async () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("cartItems");
    handleUserMenuClose();
    dispatch(logout());

    StandartSwalAlert({
      position: "top",
      icon: "success",
      title: t("Dialoges.logoutSuccess"),
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/", { replace: true });
  };

  const switchToRegister = () => {
    setIsLoginVisible(false);
    setIsRegisterVisible(true);
  };

  const switchToLogin = () => {
    setIsRegisterVisible(false);
    setIsLoginVisible(true);
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    handleUserMenuClose();
  };

  // Function to handle language change
  const handleLanguageChange = () => {
    console.log(i18n.language);
    if (i18n.language === "he") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("he");
    }
    handleUserMenuClose();
  };

  return (
    <div
      className={`${styles["navbar"]} ${scroll ? styles["navbar-scroll"] : ""}`}
      style={navbarStyle}
    >
      <button
        id="home-page"
        className={styles["nav-button"]}
        onClick={() => navigate("/", { behavior: "smooth" })}
      >
        {t("navbar.home-page")}
      </button>
      <button
        id="shop_online"
        className={styles["nav-button"]}
        aria-controls={isMenuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={handleMenuItemClick}
      >
        {t("navbar.shop_online")}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuItemClose}
        disableScrollLock={true}
        PaperProps={{
          style: {
            width: "180px",
            right: "28.5%",
            backgroundColor: "rgba(255, 255, 255, 0.67)",
          },
        }}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        {i18n.language === "ar"
          ? extendedCategoriesNamesAR.map((category, index) => (
              <MenuItem
                key={index}
                style={{ fontSize: "18px" }}
                onClick={() => navigateToMenu(category)}
              >
                {category}
              </MenuItem>
            ))
          : extendedCategoriesNamesHE.map((category, index) => (
              <MenuItem
                key={index}
                style={{ fontSize: "18px" }}
                onClick={() => navigateToMenu(category)}
              >
                {category}
              </MenuItem>
            ))}
      </Menu>
      <div
        className={styles["nav-logo"]}
        onClick={() => navigate("/", { behavior: "smooth" })}
      >
        Reem's Bakery
      </div>
      <button
        id="shoping-basket"
        className={styles["nav-button"]}
        onClick={() => navigate("/shopingCart", { behavior: "smooth" })}
      >
        {t("navbar.shoping-basket")}
      </button>
      <button
        id="user-menu"
        className={styles["nav-button"]}
        aria-controls={isUserMenuOpen ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen ? "true" : undefined}
        onClick={handleUserMenuClick}
      >
        {t("navbar.user_menu")}
      </button>
      <Menu
        id="user-menu"
        anchorEl={userMenuAnchorEl}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        disableScrollLock={true}
        PaperProps={{
          style: {
            width: "180px",
            right: "89%",
            backgroundColor: "rgba(255, 255, 255, 0.67)",
          },
        }}
      >
        {isThereAUser && (
          <div>
            <MenuItem onClick={() => navigate("/profile/accountsettings")}>
              {t("navbar.profile")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                const contactUs = document.getElementById("contact-us");
                if (contactUs) {
                  contactUs.scrollIntoView({ behavior: "smooth" });
                  handleUserMenuClose();
                } else {
                  navigate("/", { state: { scrollToContactUs: true } });
                  handleUserMenuClose();
                }
              }}
            >
              {t("navbar.contact_us")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                const aboutUs = document.getElementById("about-us");
                if (aboutUs) {
                  aboutUs.scrollIntoView({ behavior: "smooth" });
                  handleUserMenuClose();
                } else {
                  navigate("/", { state: { scrollToAboutUs: true } });
                  handleUserMenuClose();
                }
              }}
            >
              {t("navbar.about_us")}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange()}>
              {t("navbar.language")}
            </MenuItem>
            <MenuItem onClick={handleSignOut}>{t("navbar.sign_out")}</MenuItem>
          </div>
        )}
        {!isThereAUser && (
          <div>
            <MenuItem
              onClick={() => {
                const aboutUs = document.getElementById("about-us");
                if (aboutUs) {
                  aboutUs.scrollIntoView({ behavior: "smooth" });
                  handleUserMenuClose();
                } else {
                  navigate("/", { state: { scrollToAboutUs: true } });
                  handleUserMenuClose();
                }
              }}
            >
              {t("navbar.about_us")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                const contactUs = document.getElementById("contact-us");
                if (contactUs) {
                  contactUs.scrollIntoView({ behavior: "smooth" });
                  handleUserMenuClose();
                } else {
                  navigate("/", { state: { scrollToContactUs: true } });
                  handleUserMenuClose();
                }
              }}
            >
              {t("navbar.contact_us")}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange()}>
              {t("navbar.language")}
            </MenuItem>
            <MenuItem onClick={handleLoginClick}>
              {t("navbar.sign_in")}
            </MenuItem>
          </div>
        )}
      </Menu>
      {isLoginVisible && (
        <Login
          show={isLoginVisible}
          onClose={() => setIsLoginVisible(false)}
          switchToRegister={switchToRegister}
        />
      )}
      {isRegisterVisible && (
        <Register
          show={isRegisterVisible}
          onClose={() => setIsRegisterVisible(false)}
          switchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default Navbar;
