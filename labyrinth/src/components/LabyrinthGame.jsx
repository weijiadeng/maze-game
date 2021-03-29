import { useRef } from 'react';
import { GamePanel } from './GamePanel';
import ElapseTimer from './ElapseTimer';
import { LabyrinthView } from './LabyrinthView';
import { EventManager } from './EventManager';
import { MiniMap } from './MiniMap'
import { BackgroundMusic } from '../commons/BackgroundMusic'
import PlayerStatusPanel from './PlayerStatusPanel';
import { EASY, HARD, MEDIUM, selectGameMode } from '../reducers/gameModeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { initLabyrinthWalls } from './Walls';
import {
  assignInit,
  assignNumX,
  assignNumZ,
  assignPosX,
  assignPosZ,
  assignWallTop,
  assignWallLeft,
  selectIsInit,
  assignResetCamera,
  assignResetEvent,
  resetCurrentAction,
  selectPosX,
  selectPosZ,
  selectWallLeft,
  selectWallTop,
  selectAction,
  selectNumX,
  selectNumZ,
  selectResetEvent,
} from '../reducers/controlSlice';
import {
  addABuff,
  addADebuff,
  DARK_MODE_OFF,
  DARK_MODE_ON,
  MINI_MAP_ON,
  MINI_MAP_OFF,
  selectBuff,
  selectDebuff,
  selectHP,
  setGameFail,
} from '../reducers/playerStatusSlice';
import styles from "./labyrinthGame.module.css"
import { selectCurNumSeconds } from '../reducers/elapseTimerSlice';

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
      console.log("game mode error: " + gameMode);

  }

  const blockWidth = 20;
  const blockDepth = 0.5;
  const blockHeight = 10;
  const discovered = useRef(Array(numX * numZ + 1).fill(false));
  const isInit = useSelector(selectIsInit);
  const dispatch = useDispatch();
  // Reset the game when initialization
  if (!isInit) {
    dispatch(assignNumX(numX));
    dispatch(assignNumZ(numZ));
    dispatch(assignPosX(numX - 1));
    dispatch(assignPosZ(numZ - 1));
    dispatch(assignResetCamera(false));
    const [wallLeft, wallTop] = initLabyrinthWalls(numX, numZ);
    dispatch(assignWallLeft(wallLeft));
    dispatch(assignWallTop(wallTop));
    dispatch(resetCurrentAction());
    if (gameMode === EASY) {
      dispatch(addABuff(MINI_MAP_ON));
      dispatch(addABuff(DARK_MODE_OFF));
    } else if (gameMode === HARD) {
      dispatch(addADebuff(MINI_MAP_OFF));
      dispatch(addADebuff(DARK_MODE_ON));
    } else if (gameMode === MEDIUM) {
      dispatch(addABuff(DARK_MODE_OFF));
      dispatch(addADebuff(MINI_MAP_OFF));
    }
    dispatch(assignInit(true));
    dispatch(assignResetEvent(true));
    discovered.current = Array(numX * numZ + 1).fill(false);
  }
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const wallLeft = useSelector(selectWallLeft);
  const wallTop = useSelector(selectWallTop);
  const currentAction = useSelector(selectAction);
  const buff = useSelector(selectBuff);
  const debuff = useSelector(selectDebuff);
  const isResetEvent = useSelector(selectResetEvent);
  const currentHP = useSelector(selectHP);
  const currentCurNumSeconds = useSelector(selectCurNumSeconds);
  const isGameFail = (currentHP <=0 || 10 - currentCurNumSeconds <= 0);

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
        wallLeft={wallLeft}
        wallTop={wallTop}
        darkModeIsOn={debuff & DARK_MODE_ON}
      />
      <GamePanel />
      <EventManager
        discovered={discovered}
        posX={posX}
        posZ={posZ}
        numX={numX}
        numZ={numZ}
        currentAction={currentAction}
        isResetEvent={isResetEvent}
        isGameFail={isGameFail}
      />
      <MiniMap
        discovered={discovered}
        posX={posX}
        posZ={posZ}
        numX={numX}
        numZ={numZ}
        wallLeft={wallLeft}
        wallTop={wallTop}
        currentAction={currentAction}
        miniMapIsOn={buff & MINI_MAP_ON}
        isGameFail={isGameFail}
      />
      <ElapseTimer />
      <BackgroundMusic />
      <PlayerStatusPanel buff={buff} debuff={debuff} />
    </div>
  );
}
