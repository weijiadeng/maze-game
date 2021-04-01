import React from "react";
import speedUpIcon from "../images/rocket.png";
import speedDownIcon from "../images/turtleicon.png";
import miniMapIcon from "../images/mapicon.png";
import heartIcon from "../images/heart-icon.png";
import darkModeIcon from "../images/night.png";
import brightModeIcon from "../images/sun.png";
import normalClock from "../images/normalclock.png";
import outOfTimeClock from "../images/outoftimeclock.png";
import styles from "./helperPage.module.css";

const IconDescription = () => {
  return (
    <div className={styles.iconDescriptionContainer}>
      <div>
        <span className={styles.plainText}>
          <img className={styles.eventIcon} src={heartIcon} alt="heart Icon" />
          HP
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={normalClock}
            alt="normal clock Icon"
          />
          Clock
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={outOfTimeClock}
            alt="out of time clock Icon"
          />
          Hurry clock
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={miniMapIcon}
            alt="mini map Icon"
          />
          Mini Map
        </span>
      </div>

      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={darkModeIcon}
            alt="dark mode Icon"
          />
          Dark Mode
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={brightModeIcon}
            alt="bright mode Icon"
          />
          Bright Mode
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={speedUpIcon}
            alt="speed up Icon"
          />
          Speed Up
        </span>
      </div>
      <div>
        <span className={styles.plainText}>
          <img
            className={styles.eventIcon}
            src={speedDownIcon}
            alt="speed down Icon"
          />
          Speed Down
        </span>
      </div>
    </div>
  );
};

export default IconDescription;
