import React from 'react';
import { useDispatch } from 'react-redux';
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
      case 'ArrowDown' :
        handleMoveBackward();
      default:
        break;
    }
  }

  document.addEventListener("keydown", handleKeyDown);


  return (
    <div>
      <button className="button forward-button" onClick={() => dispatch(moveForward())}>
        Move Forward
        </button>
        <button className="button backward-button" onClick={() => dispatch(moveBackward())}>
        Move Backward
        </button>
      <button className="button turn-left-button" onClick={() => dispatch(turnLeft())}>
        Turn Left
        </button>
      <button className="button turn-right-button" onClick={() => dispatch(turnRight())}>
        Turn Right
        </button>
    </div>
  );
}
