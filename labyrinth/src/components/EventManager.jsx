import React, { useEffect, useRef, useState } from "react";
import {
  assignInit,
  assignResetEvent,
  NOTHING,
  RANDOM_EVENT,
  resumeAction,
} from "../reducers/controlSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  readyCount,
  selectCurNumSeconds,
  resumeCount,
  resetCount,
} from "../reducers/elapseTimerSlice";
import { resetPlayerStatus } from "../reducers/playerStatusSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import SmallPopUpWindow from "./SmallPopUpWindow";
import {
  EVENT_WINDOW,
  disableBigPopUpPresense,
  enableBigPopUpIsToOpen,
  enableSmallPopUpIsToOpen,
} from "../reducers/popUpWindowSlice";
import { partialApply, genRandomInt } from "../commons/utils";
import background from "../images/bigWindowBackground.png";
import { appendToLeaderBoard } from "../reducers/leaderboardSlice";
import {
  usePositiveEffectSound,
  useNegativeEffectSound,
  useGameCompletionSound,
  useConfrontBattleSound,
  useNeutralEffectSound,
  useGameOverSound,
} from "../commons/SoundHooks";
import {
  decreaseHP,
  increaseHP,
  removeABuff,
  removeADebuff,
  resetBuffAndDebuff,
  addABuff,
  addADebuff,
  DARK_MODE_ON,
  DARK_MODE_OFF,
  MINI_MAP_ON,
  MINI_MAP_OFF,
  SPEED_UP,
  SPEED_DOWN,
} from "../reducers/playerStatusSlice";
import { playBGM, stopBGM } from "../reducers/backgroundMusicSlice";
import { LearderboardSection } from "./Leaderboard";
import styles from "./eventManager.module.css";
import dayIcon from "../images/sun.png";
import nightIcon from "../images/night.png";
import rocket from "../images/rocket.png";
import turtleIcon from "../images/turtleicon.png";
import mapOnIcon from "../images/mapicon.png";
import mapOffIcon from "../images/mapoff.png";
import hpBonusIcon from "../images/hpbonus.png";
// Ref:https://www.flaticon.com/free-icon/battle_1732452
import battleIcon from "../images/battle.png";
import { useHistory } from "react-router";

const NUM_DEBUFF_TYPE = 3;
const DARK_MODE_ID = 0;
const SPEED_DOWN_ID = 1;
const HIDE_MINI_MAP = 2;

const NUM_BUFF_TYPE = 4;
const BRIGHT_MODE_ID = 0;
const SPEED_UP_ID = 1;
const SHOW_MINI_MAP = 2;
const HP_UP_BY_TEN = 3;

const RANDOM_ID_MAX = 100;
const RANDOM_ID_WITHHOLD = 33;

const NUM_RANDOM_EVENT_TYPE = NUM_DEBUFF_TYPE + NUM_BUFF_TYPE + 2;

const POSITIVE_EFFECT_EVENT = 0;
const NEGATIVE_EFFECT_EVENT = 1;
const NEUTRAL_EFFECT_EVENT = 2;
const CONFRONT_BATTLE_EVENT = 3;

const START_GAME_EVENT = 4;
const END_GAME_EVENT = 5;
const GAME_FAIL_EVENT = 6;

function StartEventRender() {
  const dispatch = useDispatch();
  const buttons = (
    <div
      onClick={() => {
        dispatch(resumeCount());
        dispatch(resumeAction());
        dispatch(disableBigPopUpPresense());
      }}
    >
      Play now!
    </div>
  );
  return (
    <BigPopUpWindow
      buttons={buttons}
      background={background}
      openType={EVENT_WINDOW}
    >
      <h1>You are in a maze</h1>
      <div>This is a dangerous maze, good luck!</div>
    </BigPopUpWindow>
  );
}

function startEventCallback(dispatch) {
  dispatch(readyCount());
}

function EndEventRender() {
  const time = useSelector(selectCurNumSeconds);
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const hasAppend = useRef(false);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(hasAppend.current);
  useEffect(() => {
    if (!hasAppend.current) {
      console.log("appended");
      dispatch(appendToLeaderBoard(time));
      hasAppend.current = true;
    }
  });
  const handleLeaderboard = () => {
    if (isShowLeaderboard) {
      setIsShowLeaderboard(false);
    } else {
      setIsShowLeaderboard(true);
    }
  };

  const buttons = (
    <React.Fragment>
      <div
        onClick={() => {
          dispatch(resumeAction());
          dispatch(resetPlayerStatus());
          dispatch(resetCount());
          dispatch(assignInit(false));
          dispatch(disableBigPopUpPresense());
        }}
      >
        {" "}
        Play Again
      </div>
      <div onClick={() => history.push("/")}>Home</div>
      <div onClick={() => handleLeaderboard()}>
        {" "}
        {isShowLeaderboard ? "Go back" : "Check leaderboard"}{" "}
      </div>
    </React.Fragment>
  );

  return (
    <BigPopUpWindow
      buttons={buttons}
      background={background}
      openType={EVENT_WINDOW}
    >
      {isShowLeaderboard ? (
        <LearderboardSection />
      ) : (
        <>
          <h1>Congrats!</h1>
          <div>You've passed the maze within {time} seconds!</div>
        </>
      )}
    </BigPopUpWindow>
  );
}

function FailGameEventRender() {
  const dispatch = useDispatch();
  const history = useHistory();
  const buttons = (
    <React.Fragment>
      <div
        onClick={() => {
          dispatch(resumeAction());
          dispatch(resetPlayerStatus());
          dispatch(resetCount());
          dispatch(assignInit(false));
          dispatch(disableBigPopUpPresense());
        }}
      >
        {" "}
        Try again{" "}
      </div>
      <div onClick={() => history.push("/")}>Home</div>
      <div> Check leaderboard </div>
    </React.Fragment>
  );

  return (
    <BigPopUpWindow
      buttons={buttons}
      background={background}
      openType={EVENT_WINDOW}
    >
      <h1>Oops!</h1>
      <div>You've failed the game (▰˘︹˘▰)!</div>
    </BigPopUpWindow>
  );
}

// function endEventCallback(dispatch, playGameCompletionSound) {
function endEventCallback(dispatch, play) {
  play();
}

// With a Strong wind, all buff and debuff are cleared.
// function strongWindEventCallBack(dispatch, playNeutralEffectSound) {
function strongWindEventCallBack(dispatch, play, gameMode) {
  play();
  dispatch(resetBuffAndDebuff());
  if (gameMode === "hard") {
    dispatch(addADebuff(DARK_MODE_ON));
    dispatch(removeABuff(DARK_MODE_OFF));
  } else {
    dispatch(addABuff(DARK_MODE_OFF));
    dispatch(removeADebuff(DARK_MODE_ON));
  }
  dispatch(addADebuff(MINI_MAP_OFF));
  dispatch(removeABuff(MINI_MAP_ON));
}

function StrongWindEventRender() {
  return (
    <SmallPopUpWindow>
      <h1>Wow!</h1>
      <div>You've been applied A strong wind!</div>
      <div>
        <span className={styles.neutralKeywords}>All effects are cleared!</span>
      </div>
    </SmallPopUpWindow>
  );
}

// The smelly wind will add debuff: darkmode, minimap off, slowly move.
// function smellyWindEventCallBack(debuffID, dispatch, playNegativeEffectSound) {
function smellyWindEventCallBack(debuffId, dispatch, play) {
  play();
  // Generate a random debuff
  switch (debuffId) {
    case DARK_MODE_ID:
      dispatch(addADebuff(DARK_MODE_ON));
      dispatch(removeABuff(DARK_MODE_OFF));
      break;
    case SPEED_DOWN_ID:
      dispatch(addADebuff(SPEED_DOWN));
      dispatch(removeABuff(SPEED_UP));
      break;
    case HIDE_MINI_MAP:
      dispatch(addADebuff(MINI_MAP_OFF));
      dispatch(removeABuff(MINI_MAP_ON));
      break;
    default:
      break;
  }
}

function confrontBattleCallBack(HP, dispatch, play) {
  play();
  dispatch(decreaseHP(HP));
}

function SmellyWindEventRender({ debuffId }) {
  let specificEventContent = <></>;
  let specificIcon = <></>;
  switch (debuffId) {
    case DARK_MODE_ID:
      specificIcon = (
        <img className={styles.icon} src={nightIcon} alt="Dark mode" />
      );
      specificEventContent = (
        <div>
          <span className={styles.negativeKeywords}>Dark Mode</span> is on!
        </div>
      );
      break;
    case SPEED_DOWN_ID:
      specificIcon = (
        <img className={styles.icon} src={turtleIcon} alt="Slow down" />
      );
      specificEventContent = (
        <div>
          Your speed is{" "}
          <span className={styles.negativeKeywords}>slowed down</span>!
        </div>
      );
      break;
    case HIDE_MINI_MAP:
      specificIcon = (
        <img className={styles.icon} src={mapOffIcon} alt="Mini map off" />
      );
      specificEventContent = (
        <div>
          <span className={styles.negativeKeywords}>Mini map</span> is gone!
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <SmallPopUpWindow>
      {specificIcon}
      <h1>Oh no!</h1>
      <div>You met a smelly wind...</div>
      {specificEventContent}
    </SmallPopUpWindow>
  );
}

function BattleEventRender({ HP }) {
  return (
    <SmallPopUpWindow>
      <img className={styles.icon} src={battleIcon} alt="Battle Event" />{" "}
      <h1>Oh no!</h1>
      <div>You fought with an monster...</div>
      <div>
        Your lost <span className={styles.negativeKeywords}>{HP} HP</span>!
      </div>
    </SmallPopUpWindow>
  );
}

function FreshWindEventRender({ buffId }) {
  let specificEventContent = <></>;
  let specificIcon = <></>;
  switch (buffId) {
    case BRIGHT_MODE_ID:
      specificIcon = (
        <img className={styles.icon} src={dayIcon} alt="Day mode" />
      );

      specificEventContent = (
        <div>
          <span className={styles.positiveKeywords}>Bright mode</span> is on!
        </div>
      );
      break;
    case SPEED_UP_ID:
      specificIcon = (
        <img className={styles.icon} src={rocket} alt="Speed up" />
      );
      specificEventContent = (
        <div>
          <span className={styles.positiveKeywords}>Speed up</span> is applied
          to you!
        </div>
      );
      break;
    case SHOW_MINI_MAP:
      specificIcon = (
        <img className={styles.icon} src={mapOnIcon} alt="Minimap on" />
      );
      specificEventContent = (
        <div>
          <span className={styles.positiveKeywords}>Mini map</span> is shown for
          you!
        </div>
      );
      break;
    case HP_UP_BY_TEN:
      specificIcon = (
        <img className={styles.icon} src={hpBonusIcon} alt="HP bouns" />
      );
      specificEventContent = (
        <div>
          Your got <span className={styles.positiveKeywords}>10 HP</span>!
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <SmallPopUpWindow>
      {specificIcon}
      <h1>Great!</h1>
      <div>A fresh wind brought you something helpful! </div>
      {specificEventContent}
    </SmallPopUpWindow>
  );
}

// With a Fresh wind, one buff is added: brightmode, minimap on, faster move.
// function freshWindEventCallBack(buffId, dispatch, playPositiveEffectSound) {
function freshWindEventCallBack(buffId, dispatch, play) {
  play();
  // Generate a random buff
  switch (buffId) {
    case BRIGHT_MODE_ID:
      dispatch(addABuff(DARK_MODE_OFF));
      dispatch(removeADebuff(DARK_MODE_ON));
      break;
    case SPEED_UP_ID:
      dispatch(addABuff(SPEED_UP));
      dispatch(removeADebuff(SPEED_DOWN));
      break;
    case SHOW_MINI_MAP:
      dispatch(addABuff(MINI_MAP_ON));
      dispatch(removeADebuff(MINI_MAP_OFF));
      break;
    case HP_UP_BY_TEN:
      dispatch(increaseHP(10));
      break;
    default:
      break;
  }
}

class Event {
  constructor(toRender, callBack, eventTypeId) {
    this.toRender = toRender;
    this.callBack = callBack;
    this.eventTypeId = eventTypeId;
  }
}

function initEventMap(numX, numZ, gameMode) {
  const eventMap = Array(numX * numZ + 1).fill(null);
  eventMap[numX * (numZ - 1) + numX - 1] = new Event(
    <StartEventRender />,
    startEventCallback,
    START_GAME_EVENT
  );
  eventMap[0] = new Event(<EndEventRender />, endEventCallback, END_GAME_EVENT);
  eventMap[numX * numZ + 1] = new Event(
    <FailGameEventRender />,
    endEventCallback,
    GAME_FAIL_EVENT
  );
  if (gameMode !== "pure") {
    for (let i = numX * (numZ - 1) + numX - 2; i > 0; i--) {
      const randomID = genRandomInt(RANDOM_ID_MAX);
      // Make only about RANDOM_ID_WITHHOLD/RANDOM_ID_MAX cells have events
      if (randomID < RANDOM_ID_WITHHOLD) {
        // Only 1/(NUM_BUFF_TYPE + NUM_DEBUFF_TYPE + 1) type event is netural
        if (randomID < RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) {
          eventMap[i] = new Event(
            <StrongWindEventRender />,
            strongWindEventCallBack,
            NEUTRAL_EFFECT_EVENT
          );
        } else if (
          randomID <
          (RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) * 3
        ) {
          let HP = genRandomInt(40) + 1;
          eventMap[i] = new Event(
            <BattleEventRender HP={HP} />,
            partialApply(confrontBattleCallBack, HP),
            CONFRONT_BATTLE_EVENT
          );
        } else if (
          randomID <
          (RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) * (4 + NUM_BUFF_TYPE)
        ) {
          const buffId = genRandomInt(NUM_BUFF_TYPE);
          eventMap[i] = new Event(
            <FreshWindEventRender buffId={buffId} />,
            partialApply(freshWindEventCallBack, buffId),
            POSITIVE_EFFECT_EVENT
          );
        } else {
          const debuffId = genRandomInt(NUM_DEBUFF_TYPE);
          eventMap[i] = new Event(
            <SmellyWindEventRender debuffId={debuffId} />,
            partialApply(smellyWindEventCallBack, debuffId),
            NEGATIVE_EFFECT_EVENT
          );
        }
      }
    }
  }
  return eventMap;
}

export function EventManager({
  discovered,
  posX,
  posZ,
  numX,
  numZ,
  currentAction,
  isResetEvent,
  isGameFail,
  gameMode,
}) {
  const [eventMap, setEventMap] = useState(initEventMap(numX, numZ, gameMode));

  const currentRender = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isResetEvent) {
      setEventMap(initEventMap(numX, numZ, gameMode));
      dispatch(assignResetEvent(false));
    }
  }, [isResetEvent, numX, numZ, gameMode, dispatch]);
  const { play: playGameCompletionSound } = useGameCompletionSound();
  const { play: playPositiveEffectSound } = usePositiveEffectSound();
  const { play: playNegativeEffectSound } = useNegativeEffectSound();
  const { play: playNeutralEffectSound } = useNeutralEffectSound();
  // TODO: add confront battle event
  const { play: playConfrontBattleSound } = useConfrontBattleSound();
  const { play: playGameOverSound } = useGameOverSound();

  let currentIndex = posZ * numX + posX;

  if (isGameFail) {
    currentIndex = numX * numZ + 1;
  }

  let currentCallback = () => {};
  const callBackCommonTail = () => {
    if (currentAction === NOTHING) {
      discovered.current[currentIndex] = true;
    }
  };

  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex]) {
      if (!discovered.current[currentIndex]) {
        const { toRender, callBack, eventTypeId } = eventMap[currentIndex];
        currentRender.current = toRender;
        switch (eventTypeId) {
          case START_GAME_EVENT:
            currentCallback = () => {
              callBack(dispatch);
              dispatch(playBGM());
              dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
            };
            break;
          case END_GAME_EVENT:
            currentCallback = () => {
              callBack(dispatch, playGameCompletionSound);
              dispatch(stopBGM());
              dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
            };
            break;
          case POSITIVE_EFFECT_EVENT:
            currentCallback = () => {
              callBack(dispatch, playPositiveEffectSound);
              dispatch(enableSmallPopUpIsToOpen());
            };
            break;
          case NEGATIVE_EFFECT_EVENT:
            currentCallback = () => {
              callBack(dispatch, playNegativeEffectSound);
              dispatch(enableSmallPopUpIsToOpen());
            };
            break;
          case CONFRONT_BATTLE_EVENT:
            currentCallback = () => {
              callBack(dispatch, playConfrontBattleSound);
              dispatch(enableSmallPopUpIsToOpen());
            };
            break;
          case NEUTRAL_EFFECT_EVENT:
            currentCallback = () => {
              callBack(dispatch, playNeutralEffectSound, gameMode);
              dispatch(enableSmallPopUpIsToOpen());
            };
            break;
          case GAME_FAIL_EVENT:
            currentCallback = () => {
              callBack(dispatch, playGameOverSound);
              dispatch(stopBGM());
              dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
            };
            break;
          // TODO: add confront battle event
          // case CONFRONT_BATTLE_EVENT:
          //   currentCallback = () => { callBack(dispatch, playConfrontBattleSound); dispatch(enableIsToOpen()) };
          //   break;
          default:
            break;
        }
      }
    }
  }
  useEffect(() => {
    currentCallback();
    callBackCommonTail();
  });
  return currentRender.current;
}
