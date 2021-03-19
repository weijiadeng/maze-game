import { useRef, useEffect } from 'react';
import { GamePanel } from './GamePanel';
import ElapseTimer from './ElapseTimer';
import { LabyrinthView } from './LabyrinthView';
import { EventManager } from './EventManager';
import { MiniMap } from './MiniMap'
import { BackgroundMusic, useBgmPlay} from '../commons/BackgroundMusic'
import EffectSoundTestContainer from '../commons/SoundHooks';
import PlayerStatusPanel from './PlayerStatusPanel';
import TestPlayerStatusPanel from '../exampleComponents/TestPlayerStatusPanel';
import styles from "./labyrinthGame.module.css"

export default function LabyrinthGame() {
  const numX = 10;
  const numZ = 10;
  const blockWidth = 20;
  const blockDepth = 0.5;
  const blockHeight = 10;
  const discovered = useRef(Array(numX * numZ).fill(false));
  const { play, stop } = useBgmPlay();
  useEffect(play);

  return (
      <div className={styles.visContainer}>
        <LabyrinthView
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
  );
}
