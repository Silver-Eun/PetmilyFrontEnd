import styles from "./Star.module.css";
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';


const ARRAY = [0, 1, 2, 3, 4];

function Star({ star, onChangeScore }) {
  const [clickedStars, setClickedStars] = useState(1);

  useEffect(() => {
    setClickedStars(star);
  }, [star]);

  const countStarClick = (index) => {
    setClickedStars(index + 1);
    onChangeScore(index + 1);
  };

  return (
    <div className={styles["clickedStars"]}>
      {ARRAY.map((index) =>
      <FaStar
        key={index}
        size="25"
        onClick={() => countStarClick(index)}
        className={index < clickedStars ? styles["redStar"] : ''} />

      )}
    </div>);

}

export default Star;