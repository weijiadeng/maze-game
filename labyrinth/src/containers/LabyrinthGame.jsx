import { useRef } from "react";
import { GamePanel } from "../components/GamePanel";
import { LabyrinthView } from "../components/LabyrinthView";
import { EventManager } from "../components/EventManager";
import { MiniMap } from "../components/MiniMap";
import PlayerStatusPanel from "../components/PlayerStatusPanel";
import { useSelector, useDispatch } from "react-redux";
import { initLabyrinthWalls } from "../components/Walls";
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
  selectResetEvent,
  selectNumX,
  selectNumZ,
  assignNumWalls,
  selectNumWalls,
} from "../reducers/controlSlice";
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
  resetPlayerStatus,
} from "../reducers/playerStatusSlice";
import {
  assignTimeout,
  resetCount,
  selectCurNumSeconds,
  selectTimeout,
} from "../reducers/elapseTimerSlice";
import { useHistory, useParams } from "react-router-dom";
import { NavPanel } from "../components/NavPanel";
import styles from "./labyrinthGame.module.css";

export default function LabyrinthGame() {
  const { gameMode } = useParams();
  let numX = useSelector(selectNumX);
  let numZ = useSelector(selectNumZ);
  let timeout = useSelector(selectTimeout);
  const blockWidth = 20;
  const blockDepth = 0.5;
  const blockHeight = 10;
  const discovered = useRef(Array(numX * numZ + 1).fill(false));
  const isInit = useSelector(selectIsInit);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [gameRoundID, setGameRoundID] = useState(0);
  // Reset the game when initialization
  if (!isInit) {
    switch (gameMode) {
      case "easy":
        numX = 5;
        numZ = 5;
        timeout = 100;
        break;
      case "medium":
        numX = 10;
        numZ = 10;
        timeout = 200;
        break;
      case "hard":
        numX = 15;
        numZ = 15;
        timeout = 600;
        break;
      case "pure":
        numX = 20;
        numZ = 20;
        timeout = 0;
        break;
      default:
        history.push("/");
    }
    // setGameRoundID(genRandomInt(1024));
    dispatch(assignNumX(numX));
    dispatch(assignNumZ(numZ));
    dispatch(assignTimeout(timeout));
    dispatch(assignPosX(numX - 1));
    dispatch(assignPosZ(numZ - 1));
    dispatch(assignResetCamera(false));
    const [wallLeft, wallTop, totalWalls] = initLabyrinthWalls(numX, numZ);
    dispatch(assignWallLeft(wallLeft));
    dispatch(assignWallTop(wallTop));
    dispatch(assignNumWalls(totalWalls));
    dispatch(resetCurrentAction());
    dispatch(resetCount());
    dispatch(resetPlayerStatus());
    if (gameMode === "easy") {
      dispatch(addABuff(MINI_MAP_ON));
      dispatch(addABuff(DARK_MODE_OFF));
    } else if (gameMode === "hard") {
      dispatch(addADebuff(MINI_MAP_OFF));
      dispatch(addADebuff(DARK_MODE_ON));
    } else if (gameMode === "medium" || gameMode === "pure") {
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
  const numWalls = useSelector(selectNumWalls);
  const currentAction = useSelector(selectAction);
  const buff = useSelector(selectBuff);
  const debuff = useSelector(selectDebuff);
  const isResetEvent = useSelector(selectResetEvent);
  const currentHP = useSelector(selectHP);
  const currentCurNumSeconds = useSelector(selectCurNumSeconds);
  const isGameFail =
    gameMode === "pure"
      ? false
      : currentHP <= 0 || timeout - currentCurNumSeconds <= 0;

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
        numWalls={numWalls}
        darkModeIsOn={debuff & DARK_MODE_ON}
      />
      <GamePanel />
      <NavPanel mode={gameMode} buff={buff} />
      <EventManager
        discovered={discovered}
        posX={posX}
        posZ={posZ}
        numX={numX}
        numZ={numZ}
        currentAction={currentAction}
        isResetEvent={isResetEvent}
        isGameFail={isGameFail}
        gameMode={gameMode}
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
      <PlayerStatusPanel
        buff={buff}
        debuff={debuff}
        timeout={timeout}
        mode={gameMode}
      />
    </div>
  );
}
