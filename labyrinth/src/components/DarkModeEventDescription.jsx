import React from "react";
import darkModeIcon from "../images/night.png";
import brightModeIcon from "../images/sun.png";
import darkModePicture from "../images/darkMode.png";
import styles from "../containers/guide.module.css";

const DarkModeEventDescription = () => {
  return (
    <React.Fragment>
      <div className={styles.liHeaderContainer}>
        <p className={styles.liHeader}>
          <span className={styles.liHeaderText}>Dark/Bright Mode ON/OFF</span>{" "}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img
            className={styles.eventIcon}
            src={darkModeIcon}
            alt="dark mode Icon"
          />
          <img
            className={styles.eventIcon}
            src={brightModeIcon}
            alt="bright mode Icon"
          />
          <br />
        </p>
      </div>
      <p className={styles.eventDetail}>
        When you see these icon, It means the dark mode or bright mode has been
        enabled. These effects will immediately apply. For example, when you
        invoke the dark mode, your game view will be like this:
        <br />
        <span>
          <img
            className={styles.eventPicture}
            src={darkModePicture}
            alt="MiniMap"
          />
        </span>
      </p>
    </React.Fragment>
  );
};

export default DarkModeEventDescription;
