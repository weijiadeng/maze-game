import {useRef} from 'react';
import { GamePanel } from './Labyrinth/Controls/GamePanel';
import ElapseTimer from './Labyrinth/ElapseTimer';
import { Labyrinth } from './Labyrinth/Labyrinth';
import { EventManager } from './Labyrinth/EventManager/EventManager';
import { MiniMap } from './Labyrinth/MiniMap/MiniMap'
import './styles.css';

export default function App() {
  const numX = 10;
  const numZ = 10;
  const blockWidth = 20;
  const blockDepth = 0.5;
  const blockHeight = 10;
  const discovered = useRef(Array(numX * numZ).fill(false));
  return (
    <div className="App">
      <div className="vis-container">
        <Labyrinth
          numX={numX}
          numZ={numZ}
          blockWidth={blockWidth}
          blockHeight={blockHeight}
          blockDepth={blockDepth}
          mazeDepth={numX * blockWidth}
          mazeWidth={numZ * blockWidth}
        />
        <GamePanel />

        <EventManager 
          discovered={discovered}
        />
        <MiniMap 
          discovered={discovered}
        />
        <button className="button new-game-button" onClick={() => window.history.go(0)}>
          New Game
        </button>
        <ElapseTimer />
      </div>
    </div >
  );
}
