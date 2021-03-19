import { useRef } from 'react';
import { GamePanel } from './components/GamePanel';
import ElapseTimer from './components/ElapseTimer';
import { Labyrinth } from './components/Labyrinth';
import { EventManager } from './components/EventManager';
import { MiniMap } from './components/MiniMap'
import BackgroundMusic from './commons/BackgroundMusic'
import EffectSoundTestContainer from './commons/SoundHooks';
import PlayerStatusPanel from './components/PlayerStatusPanel';
import TestPlayerStatusPanel from './exampleComponents/TestPlayerStatusPanel';
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
        <EffectSoundTestContainer />
        <ElapseTimer />
        <BackgroundMusic />
        <PlayerStatusPanel />
        <TestPlayerStatusPanel />

      </div>
    </div >
  );
}
