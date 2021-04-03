import React from "react";
import { useDispatch } from "react-redux";
import {
  moveBackward,
  moveForward,
  turnLeft,
  turnRight,
} from "../reducers/controlSlice";
import styles from "./gamePanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

// Game control panel
export default function GamePanel() {
  const dispatch = useDispatch();

  const handleMoveForward = () => {
    dispatch(moveForward());
  };
  const handleMoveBackward = () => {
    dispatch(moveBackward());
  };

  const handleTurnLeft = () => {
    dispatch(turnLeft());
  };
  const handleTurnRight = () => {
    dispatch(turnRight());
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "a":
        handleTurnLeft();
        break;
      case "d":
        handleTurnRight();
        break;
      case "w":
        handleMoveForward();
        break;
      case "s":
        handleMoveBackward();
        break;
      default:
        break;
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return (
    <div className={styles.panelContainer}>
      <FontAwesomeIcon
        className={styles.forwardButton}
        icon={faChevronCircleUp}
        onClick={() => handleMoveForward()}
      />
      <FontAwesomeIcon
        className={styles.backwardButton}
        icon={faChevronCircleDown}
        onClick={() => handleMoveBackward()}
      />
      <FontAwesomeIcon
        className={styles.turnLeftButton}
        icon={faChevronCircleLeft}
        onClick={() => handleTurnLeft()}
      />
      <FontAwesomeIcon
        className={styles.turnRightButton}
        icon={faChevronCircleRight}
        onClick={() => handleTurnRight()}
      />
    </div>
  );
}
