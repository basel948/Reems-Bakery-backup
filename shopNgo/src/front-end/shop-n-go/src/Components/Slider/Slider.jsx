import React, { useState, useEffect, useRef } from "react"; // Import necessary hooks from React
import { useSelector, useDispatch } from "react-redux"; // Import hooks from react-redux for state management
import styles from "./Slider.module.css"; // Import CSS module for styling
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; // Import arrow icons from react-icons
import { fetchMenuItems } from "../../Redux/features/menuItemsSlice"; // Import action to fetch menu items from the Redux slice

function Slider() {
  const dispatch = useDispatch(); // Initialize dispatch
  const { items: menuItemsData = [], status } = useSelector(
    (state) => state.menuItems
  ); // Extract menu items data and status from the Redux store

  useEffect(() => {
    dispatch(fetchMenuItems()); // Dispatch action to fetch menu items when the component mounts
  }, [dispatch]);

  const [currentSlide, setCurrentSlide] = useState(0); // State to keep track of the current slide
  const timerRef = useRef(); // useRef to keep a reference to the timer

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts or menuItemsData length changes
    return () => clearInterval(timerRef.current); // Clear the timer when the component unmounts
  }, [menuItemsData.length]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % menuItemsData.length); // Automatically move to the next slide every 5 seconds
    }, 5000);
  };

  const nextSlide = () => {
    clearInterval(timerRef.current); // Clear the current timer
    setCurrentSlide((prevSlide) => (prevSlide + 1) % menuItemsData.length); // Move to the next slide
    startTimer(); // Restart the timer
  };

  const prevSlide = () => {
    clearInterval(timerRef.current); // Clear the current timer
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + menuItemsData.length) % menuItemsData.length
    ); // Move to the previous slide
    startTimer(); // Restart the timer
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading message while fetching menu items
  }

  if (status === "failed") {
    return <div>Error loading menu items.</div>; // Show error message if fetching menu items failed
  }

  const images = menuItemsData.map((item) => {
    const firstImagePath = item.imagePaths[0]; // Get the first image path of each menu item
    return `http://localhost:8080/api/auth/MenuItemsImages/${firstImagePath}`; // Construct the full URL for the image
  });

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider"]}>
        <img
          src={images[currentSlide]} // Set the source of the image to the current slide's image
          alt=""
          className={styles["slider-image"]}
        />
      </div>

      <div className={styles["slider-controls"]}>
        <button
          onClick={prevSlide}
          className={`${styles["slider-button"]} ${styles["slider-button-prev"]}`}
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className={`${styles["slider-button"]} ${styles["slider-button-next"]}`}
        >
          <AiOutlineArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Slider;
