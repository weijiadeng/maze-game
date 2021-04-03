import React from "react";
import movesGuide from "../images/movesGuide.png";
import styles from "./helperPage.module.css";

// A brief description on how to control the game, used on guide and helper window section
const OperationDescription = () => {
  return (
    <div className={styles.operationDescription}>
      <p className={styles.plainText}>
        Use "W", "A", "S", "D" to move forward, left, backward, right.
      </p>
      <img className={styles.moveGuide} src={movesGuide} alt="move guide" />
    </div>
  );
};

export default OperationDescription;
