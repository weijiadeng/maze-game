import { useRef, useEffect } from 'react';
import { GamePanel } from './GamePanel';
import ElapseTimer from './ElapseTimer';
import { LabyrinthView } from './LabyrinthView';
import { EventManager } from './EventManager';
import { MiniMap } from './MiniMap'
import { BackgroundMusic, useBgmPlay } from '../commons/BackgroundMusic'
import PlayerStatusPanel from './PlayerStatusPanel';
import styles from "./labyrinthGame.module.css"
import { useSelector } from 'react-redux';
import { EASY, HARD, MEDIUM, selectGameMode } from '../reducers/gameModeSlice';

export default function LabyrinthGame() {
  const gameMode = useSelector(selectGameMode);
  let numX;
  let numZ;
  switch (gameMode) {
    case EASY:
      numX = 5;
      numZ = 5;
      break;
    case MEDIUM:
      numX = 10;
      numZ = 10;
      break;
    case HARD:
      numX = 15;
      numZ = 15;
      break;
    default:
    // console.log("game mode error: " + gameMode);

  }
  const blockWidth = 20;
  const blockDepth = 0.5;
  const blockHeight = 10;
  const discovered = useRef(Array(numX * numZ).fill(false));
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
      <ElapseTimer />
      <BackgroundMusic />
      <PlayerStatusPanel />
    </div>
  );
}
