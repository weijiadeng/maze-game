import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, selectIsDark, selectShowMiniMap } from '../reducers/gameStatusSlice';
import {
  moveBackward,
  moveForward,
  resetLastMoveHitWall,
  selectLastMoveHitWall,
  selectNumX,
  selectNumZ,
  selectPosX,
  selectPosZ,
  selectWallLeft,
  selectWallTop,
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

  const showMiniMap = useSelector(selectShowMiniMap);
  const isDarkMode = useSelector(selectIsDark);

  const handleToggleMiniMap = () => {
    if (showMiniMap) {
      dispatch(disableMiniMap());
    } else {
      dispatch(enableMiniMap())
    }
  };

  const handleToggleDarkMode = () => {
    if (isDarkMode) {
      dispatch(disableDarkMode());
    } else {
      dispatch(enableDarkMode())
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        window.history.go(0);
        break;
      case 'ArrowLeft':
        handleTurnLeft();
        break;
      case 'ArrowRight':
        handleTurnRight();
        break;
      case 'ArrowUp':
        handleMoveForward();
        break;
      case 'ArrowDown':
        handleMoveBackward();
        break;
      default:
        break;
    }
  }

  const isPlayHitWall = useSelector(selectLastMoveHitWall);
  const {play} = useHitWallSound();
  if (isPlayHitWall) {
    play();
    dispatch(resetLastMoveHitWall());
  }

  document.addEventListener("keydown", handleKeyDown);


  return (
    <div>
      <button className={styles.forwardButton} onClick={() => handleMoveForward()}>
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
        </button>
      <button className={styles.toggleMiniMap} onClick={() => handleToggleMiniMap()}>
        ToggleMiniMap
      </button>
      <button className={styles.toggleDarkMode} onClick={() => handleToggleDarkMode()}>
        ToggleDarkMode
      </button>
    </div>
  );
}
