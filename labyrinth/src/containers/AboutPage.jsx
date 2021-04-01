import React from "react";
import { NavLink } from "react-router-dom";
import { WelcomeScreens } from "./Welcome";
import styles from "./welcome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  return (
    <WelcomeScreens>
      <div className={`${styles.options} ${styles.aboutPage}`}>
        <ul className={styles.aboutList}>
          <li>Author:</li>
          <ul className={styles.authorList}>
            <li>
              Weijia Deng
              <a
                className={styles.personalWebsite}
                href="https://weijiadeng.github.io/"
              >
                <FontAwesomeIcon icon={faPaperPlane} size="xs" />
              </a>
            </li>
            <li>
              Wenhua Yao
              <a
                className={styles.personalWebsite}
                href="https://www.linkedin.com/in/wenhua-yao-569013189/"
              >
                <FontAwesomeIcon icon={faPaperPlane} size="xs" />
              </a>
            </li>
          </ul>
          <li>
            Music used comes from{" "}
            <a
              className={styles.creditLink}
              href="https://mixkit.co/free-sound-effects/game/"
            >
              Mixkit
            </a>
          </li>
          <li>Thank you for playing!</li>
        </ul>
        <NavLink to="/" className={styles.buttons}>
          Go back
        </NavLink>
      </div>
    </WelcomeScreens>
  );
};

export default AboutPage;
