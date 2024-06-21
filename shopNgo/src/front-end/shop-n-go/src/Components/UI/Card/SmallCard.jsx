import React from "react";
import styles from "./SmallCard.module.css";
import Card from "./Card";

function SmallCard({ title, img, isSelected, onClick }) {
  const cardStyle = isSelected
    ? `${styles.card} ${styles.selected}`
    : styles.card;

  return (
    <div className={cardStyle} onClick={onClick}>
      <img src={img} alt={title} />
      <h4>{title}</h4>
    </div>
  );
}

export default SmallCard;
