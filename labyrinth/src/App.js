import * as React from 'react';
import Labyrinth from './Labyrinth/Labyrinth';
import './styles.css';

export default function App() {
  const visRef = React.useRef();

  const handleMoveForward = () => {
    visRef.current.moveForward();
  };
  const handleTurnLeft = () => {
    visRef.current.turnLeft();
  };
  const handleTurnRight = () => {
    visRef.current.turnRight();
  };
  return (
    <div className="App">
      <div className="vis-container">
        <Labyrinth
        numX = {10}
        numZ = {10}
        blockWidth = {40}
        blockHeight = {20}
        blockDepth = {1}
        mazeDepth = {200}
        mazeWidth = {200}
        ref={visRef}/>
        <button className="forward-button" onClick={handleMoveForward}>
          Move Forward
        </button>
        <button className="turn-left-button" onClick={handleTurnLeft}>
          Turn Left
        </button>
        <button className="turn-right-button" onClick={handleTurnRight}>
          Turn Right
        </button>

      </div>
    </div>
  );
}
