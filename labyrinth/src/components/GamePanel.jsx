import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  moveBackward,
  moveForward,
  resetLastMoveHitWall,
  selectLastMoveHitWall,
  turnLeft,
  turnRight,
} from '../reducers/controlSlice';
import styles from "./gamePanel.module.css"
import { useHitWallSound } from '../commons/SoundHooks';

export function GamePanel() {

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
      case 'a':
        handleTurnLeft();
        break;
      case 'd':
        handleTurnRight();
        break;
      case 'w':
        handleMoveForward();
        break;
      case 's':
        handleMoveBackward();
        break;
      default:
        break;
    }
  }

  const isPlayHitWall = useSelector(selectLastMoveHitWall);
  const { play } = useHitWallSound();
  if (isPlayHitWall) {
    play();
    dispatch(resetLastMoveHitWall());
  }

  document.addEventListener("keydown", handleKeyDown);


  return (
    <div>
      {/* <button className={styles.forwardButton} onClick={() => handleMoveForward()}>
        Move Forward
        </button>
      <button className={styles.backwardButton} onClick={() => handleMoveBackward()}>
        Move Backward
        </button>
      <button className={styles.turnLeftButton} onClick={() => handleTurnLeft()}>
        Turn Left
        </button>
      <button className={styles.turnRightButton} onClick={() => handleTurnRight()}>
        Turn Right
        </button> */}
    </div>
  );
}
