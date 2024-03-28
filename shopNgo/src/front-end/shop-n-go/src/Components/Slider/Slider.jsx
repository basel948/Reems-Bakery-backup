import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./Slider.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { AppContext } from "../../AppProvider";

function Slider() {
  // Use menuItemsData from AppContext
  const { menuItemsData } = useContext(AppContext);

  // Create an array of full images URLs using the base URL and appending imagePath
  const images = menuItemsData.map((item) => {
    // Take only the first image from each item's imagePaths array
    const firstImagePath = item.imagePaths[0];
    return `http://localhost:8080/api/auth/MenuItemsImages/${firstImagePath}`;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef();

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
  };

  // Automatically change slide every 5 seconds
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const nextSlide = () => {
    clearInterval(timerRef.current);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    startTimer();
  };

  const prevSlide = () => {
    clearInterval(timerRef.current);
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
    startTimer();
  };

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider"]}>
        <img
          src={images[currentSlide]} // Use the currentSlide index to show the image
          alt=""
          className={styles["slider-image"]}
        />
      </div>

      {/* Controls */}
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
