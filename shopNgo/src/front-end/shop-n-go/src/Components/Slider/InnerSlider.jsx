import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./InnerSlider.module.css";
function InnerSlider({ productImages }) {
  return (
    <div>
      <Fade>
        {productImages.map((image, index) => (
          <div key={index} className={styles["each-slide"]}>
            <div>
              <img src={image} alt={`product-image-${index}`} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default InnerSlider;
