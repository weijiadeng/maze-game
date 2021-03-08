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
      default:
        break;
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return (
    <div className="App">
      <div className="vis-container">
        <Labyrinth
          numX={10}
          numZ={10}
          blockWidth={40}
          blockHeight={20}
          blockDepth={1}
          mazeDepth={200}
          mazeWidth={200}
          ref={visRef} />
        <button className="button forward-button" onClick={handleMoveForward}>
          Move Forward
        </button>
        <button className="button turn-left-button" onClick={handleTurnLeft}>
          Turn Left
        </button>
        <button className="button turn-right-button" onClick={handleTurnRight}>
          Turn Right
        </button>
        <button className="button new-game-button" onClick={() => window.history.go(0)}>
          New Game
        </button>
      </div>
    </div>
  );
}
