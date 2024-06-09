import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card/Card";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styles from "./CardMenuSlider.module.css";
import { fetchCategories } from "../../Redux/features/categoriesSlice";

function CardMenuSlider() {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  const [startIndexCard, setStartIndexCard] = useState(0);
  const [updatedMenuItems, setUpdatedMenuItems] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const updatedItems = categories.flatMap((cat) => {
        return cat.menuItems.map((item) => {
          return {
            ...item,
            categoryName_AR: cat.name_AR,
            categoryName_HE: cat.name_HE,
          };
        });
      });
      setUpdatedMenuItems(updatedItems);
    }
  }, [categories, status]);

  const nextCards = () => {
    setStartIndexCard((prevStartIdx) => {
      if (prevStartIdx >= updatedMenuItems.length - 3) {
        return 0;
      }
      return prevStartIdx + 1;
    });
  };

  const prevCards = () => {
    setStartIndexCard((prevStartIdx) => {
      if (prevStartIdx <= 0) {
        return updatedMenuItems.length - 3;
      }
      return prevStartIdx - 1;
    });
  };

  const displayedProducts = updatedMenuItems.slice(
    startIndexCard,
    startIndexCard + 3
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["our-bakery-cards"]}>
        <button onClick={prevCards} className={styles["prevCard"]}>
          <IoIosArrowBack size={30} />
        </button>

        {displayedProducts.map((product, index) => (
          <Card key={index} product={product} />
        ))}

        <button onClick={nextCards} className={styles["nextCard"]}>
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
}

export default CardMenuSlider;
