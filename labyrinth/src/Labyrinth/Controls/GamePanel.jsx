import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, selectIsDark, selectShowMiniMap } from '../GameStatus/gameStatusSlice';
import {
  moveBackward,
  moveForward,
  turnLeft,
  turnRight,

} from './controlSlice';


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

  document.addEventListener("keydown", handleKeyDown);


  return (
    <div>
      <button className="button forward-button" onClick={() => handleMoveForward()}>
        Move Forward
        </button>
      <button className="button backward-button" onClick={() => handleMoveBackward()}>
        Move Backward
        </button>
      <button className="button turn-left-button" onClick={() => handleTurnLeft()}>
        Turn Left
        </button>
      <button className="button turn-right-button" onClick={() => handleTurnRight()}>
        Turn Right
        </button>
      <button className="button toggleMiniMap" onClick={() => handleToggleMiniMap()}>
        ToggleMiniMap
      </button>
      <button className="button toggleDarkMode" onClick={() => handleToggleDarkMode()}>
        ToggleDarkMode
      </button>
    </div>
  );
}
