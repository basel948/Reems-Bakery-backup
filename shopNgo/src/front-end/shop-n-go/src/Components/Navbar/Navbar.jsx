// Import necessary modules and components
import React, { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css"; // CSS module for styling
import { useTranslation } from "react-i18next"; // Hook for internationalization
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { AppContext } from "../../AppProvider"; // Context for global state
import Menu from "@mui/material/Menu"; // Material-UI menu component
import Login from "../Login/Login";
import Register from "../Register/Register";
import MenuItem from "@mui/material/MenuItem"; // Material-UI menu item component

const Navbar = ({ isTransparent }) => {
  // State for handling scroll behavior
  const [scroll, setScroll] = useState(false);
  // i18next hook for translation
  const { t, i18n } = useTranslation();
  // Hook for page navigation
  const navigate = useNavigate();
  // Context to access global state
  const { categories } = useContext(AppContext);
  // State for controlling the first dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  // Determines if the first menu is open
  const isMenuOpen = Boolean(menuAnchorEl);
  // State for controlling the user dropdown menu
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  // Determines if the user menu is open
  const isUserMenuOpen = Boolean(userMenuAnchorEl);

  // Generates category names based on current language
  const shortCategoriesNames = categories.map((item) =>
    i18n.language === "ar" ? item.name_AR : item.name_HE
  );
  // Prepares category names with "All Menu" at the start
  const extendedCategoriesNamesAR = ["كل القائمة", ...shortCategoriesNames];
  const extendedCategoriesNamesHE = ["כל התפריט", ...shortCategoriesNames];

  const { setTranslationInProgress } = useContext(AppContext);
  const { setLogoutInProgress } = useContext(AppContext);

  const [isThereAUser, setIsThereAUser] = useState(false);

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  useEffect(() => {
    const checkTokenPresence = () => {
      const token = localStorage.getItem("jwtToken");
      setIsThereAUser(!!token);
      if (token) {
        navigate("/", { replace: true });
      }
    };

    // Check token presence on mount
    checkTokenPresence();

    // Add event listener for localStorage changes
    window.addEventListener("storage", checkTokenPresence);

    // Cleanup listener
    return () => window.removeEventListener("storage", checkTokenPresence);
  }, []);

  // Function to navigate to a specific menu category
  const navigateToMenu = (category) => {
    navigate(`/menu?category=${encodeURIComponent(category)}`);
    handleMenuItemClose();
  };

  // Function to open the Menuitem dropdown menu
  const handleMenuItemClick = (event) => setMenuAnchorEl(event.currentTarget);

  // Function to close the Menuitem dropdown menu
  const handleMenuItemClose = () => setMenuAnchorEl(null);

  // Function to detect scroll event
  const checkScroll = () => setScroll(window.scrollY > 50);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Determines navbar style based on scroll and transparency prop
  let navbarStyle = {
    backgroundColor: scroll ? "black" : isTransparent ? "transparent" : "black",
  };

  // Function to open the user dropdown menu
  const handleUserMenuClick = (event) =>
    setUserMenuAnchorEl(event.currentTarget);

  // Function to close the user dropdown menu
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);

  // Function to handle sign-out action
  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    setIsThereAUser(false); // Update state to reflect logout
    handleUserMenuClose();
    setLogoutInProgress(true);
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

  // Function to toggle language
  const toggleLanguage = () => {
    setTranslationInProgress(true); // Set translation in progress
    i18n.changeLanguage(i18n.language === "ar" ? "he" : "ar");
    console.log(i18n.language);
    navigate("/", { replace: true });
    handleUserMenuClose();
  };

  // Function to show the login form
  const handleLoginClick = () => {
    setIsLoginVisible(true);
    handleUserMenuClose();
  };

  console.log(isThereAUser);

  // Rendering the navbar component
  return (
    <div
      className={`${styles["navbar"]} ${scroll ? styles["navbar-scroll"] : ""}`}
      style={navbarStyle}
    >
      {/* Home button */}
      <button
        id="home-page"
        className={styles["nav-button"]}
        onClick={() => navigate("/", { behavior: "smooth" })}
      >
        {t("navbar.home-page")}
      </button>

      {/* Shop online button */}
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

      {/* Dropdown menu for shop online */}
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

      {/* Logo and link to homepage */}
      <div
        className={styles["nav-logo"]}
        onClick={() => navigate("/", { behavior: "smooth" })}
      >
        Reem's Bakery
      </div>

      {/* Shopping basket button */}
      <button
        id="shoping-basket"
        className={styles["nav-button"]}
        onClick={() => navigate("/shopingCart", { behavior: "smooth" })}
      >
        {t("navbar.shoping-basket")}
      </button>

      {/* User menu button */}
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

      {/* Dropdown menu for user options */}
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
            <MenuItem onClick={() => navigate("/profile")}>
              {t("navbar.profile")}
            </MenuItem>
            <MenuItem onClick={() => toggleLanguage()}>
              {t("navbar.language")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                // here we check if the section exists in the current page
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
                // here we check if the section exists in the current page
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
            <MenuItem onClick={handleSignOut}>{t("navbar.sign_out")}</MenuItem>
          </div>
        )}

        {!isThereAUser && (
          <div>
            <MenuItem onClick={() => toggleLanguage()}>
              {t("navbar.language")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                // here we check if the section exists in the current page
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
                // here we check if the section exists in the current page
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
            <MenuItem onClick={handleLoginClick}>تسجيل الدخول</MenuItem>
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
