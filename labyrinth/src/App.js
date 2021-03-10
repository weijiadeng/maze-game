import * as React from 'react';
import { GamePanel } from './Labyrinth/Controls/GamePanel';
import { Labyrinth } from './Labyrinth/Labyrinth';
import './styles.css';

export default function App() {

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
        />
        <GamePanel />
        <button className="button new-game-button" onClick={() => window.history.go(0)}>
          New Game
        </button>
      </div>
    </div>
  );
}
