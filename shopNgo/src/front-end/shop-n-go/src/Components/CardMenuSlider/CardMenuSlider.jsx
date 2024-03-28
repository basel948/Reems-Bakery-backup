// Import required libraries and components
import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "./CardMenuSlider.module.css";
import { AppContext } from "../../AppProvider";

// Define the CardMenuSlider functional component
function CardMenuSlider() {
  // Initialize state for controlling the index of the first card displayed in the slider
  const [startIndexCard, setStartIndexCard] = useState(0);

  // Retrieve menu items data from the AppContext
  const { menuItemsData } = useContext(AppContext);
  const { categories } = useContext(AppContext);

  const [updatedMenuItems, setUpdatedMenuItems] = useState([]);

  useEffect(() => {
    const updatedItems = categories.flatMap((cat) => {
      return cat.menuItems.map((item) => {
        return {
          ...item, // Spread all properties of the menu item
          categoryName_AR: cat.name_AR, // Add the category name property
          categoryName_HE: cat.name_HE, // Add the category name property
        };
      });
    });
    setUpdatedMenuItems(updatedItems);
  }, [categories]);

  // Function to move to the next set of cards in the slider
  const nextCards = () => {
    setStartIndexCard((prevStartIdx) => {
      // Loop back to the start if we reach the end
      if (prevStartIdx >= updatedMenuItems.length - 3) {
        return 0;
      }
      // Otherwise, move one step forward
      return prevStartIdx + 1;
    });
  };

  // Function to move to the previous set of cards in the slider
  const prevCards = () => {
    setStartIndexCard((prevStartIdx) => {
      // Loop back to the end if we reach the start
      if (prevStartIdx <= 0) {
        return updatedMenuItems.length - 3;
      }
      // Otherwise, move one step backward
      return prevStartIdx - 1;
    });
  };

  // Slice the menu items array to get only the products that should be displayed
  const displayedProducts = updatedMenuItems.slice(
    startIndexCard,
    startIndexCard + 3
  );

  // Render the component
  return (
    <div className={styles["container"]}>
      <div className={styles["our-bakery-cards"]}>
        {/* Button to navigate to the previous set of cards */}
        <button onClick={prevCards} className={styles["prevCard"]}>
          <IoIosArrowBack size={30} />
        </button>

        {/* Map through displayed products and render each as a Card component */}
        {displayedProducts.map((product, index) => (
          <Card key={index} product={product} />
        ))}

        {/* Button to navigate to the next set of cards */}
        <button onClick={nextCards} className={styles["nextCard"]}>
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
}

// Export the CardMenuSlider component
export default CardMenuSlider;
