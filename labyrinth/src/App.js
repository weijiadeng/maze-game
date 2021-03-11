import * as React from 'react';
import { GamePanel } from './Labyrinth/Controls/GamePanel';
import { Labyrinth } from './Labyrinth/Labyrinth';
import './styles.css';

export default function App() {
  const numX = 4;
  const numZ = 4;
  const blockWidth = 10;
  const blockDepth = 0.5;
  const blockHeight = 5;
  return (
    <div className="App">
      <div className="vis-container">
        <Labyrinth
          numX={numX}
          numZ={numZ}
          blockWidth={blockWidth}
          blockHeight={blockHeight}
          blockDepth={blockDepth}
          mazeDepth={numX*blockWidth}
          mazeWidth={numZ*blockWidth}
        />
        <GamePanel />
        <button className="button new-game-button" onClick={() => window.history.go(0)}>
          New Game
        </button>
      </div>
    </div>
  );
}
