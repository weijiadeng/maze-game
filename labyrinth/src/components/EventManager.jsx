import React, { useEffect, useRef, useState } from "react";
import { assignInit, assignNumX, assignNumZ, assignResetEvent, NOTHING, popEvent, RANDOM_EVENT, selectResetEvent } from "../reducers/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { readyCount, selectCurNumSeconds, resumeCount, pauseCount, resetCount } from '../reducers/elapseTimerSlice'
import { selectHP, resetPlayerStatus } from "../reducers/playerStatusSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import SmallPopUpWindow from "./SmallPopUpWindow";
import { disableBigPopUpPresense, enableBigPopUpIsToOpen, enableSmallPopUpIsToOpen } from "../reducers/popUpWindowSlice";
import { partialApply, genRandomInt } from "../commons/utils";
import background from '../images/bigWindowBackground.png'
import { appendToLeaderBoard } from "../reducers/leaderboardSlice";
import { usePositiveEffectSound, useNegativeEffectSound, useGameCompletionSound, useNeutralEffectSound, useGameOverSound } from "../commons/SoundHooks"
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
  SPEED_DOWN
} from '../reducers/playerStatusSlice';
import { useBgmPlay } from "../commons/BackgroundMusic";
import { playBGM, stopBGM } from "../reducers/backgroundMusicSlice";
import { LearderboardSection } from "./Leaderboard";

const NUM_DEBUFF_TYPE = 4;
const DARK_MODE_ID = 0;
const SPEED_DOWN_ID = 1;
const HIDE_MINI_MAP = 2;
const HP_DOWN_BY_TEN = 3;

const NUM_BUFF_TYPE = 4;
const BRIGHT_MODE_ID = 0;
const SPEED_UP_ID = 1;
const SHOW_MINI_MAP = 2;
const HP_UP_BY_TEN = 3;

const NUM_EVENT_TYPE = 6;
const START_GAME_EVENT = 0;
const END_GAME_EVENT = 1;
const POSITIVE_EFFECT_EVENT = 2;
const NEGATIVE_EFFECT_EVENT = 3;
const NEUTRAL_EFFECT_EVENT = 4;
const CONFRONT_BATTLE_EVENT = 5;
const GAME_FAIL_EVENT = 6;

function StartEventRender() {
  const dispatch = useDispatch();
  const buttons = (<div onClick={() => {
    dispatch(resumeCount());
    dispatch(popEvent());
    dispatch(disableBigPopUpPresense());
  }}>Play now!</div>);
  return (<BigPopUpWindow buttons={buttons} background={background}>
    <h1>You are in a maze</h1>
    <div>This is a dangerous maze, good luck!</div>
  </BigPopUpWindow>);
}

function startEventCallback(dispatch) {
  dispatch(readyCount());
}

function EndEventRender() {
  const time = useSelector(selectCurNumSeconds);
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const hasAppend = useRef(false);
  const dispatch = useDispatch();
  console.log(hasAppend.current);
  useEffect(() => {
    if (!hasAppend.current) {
      console.log("appended");
      dispatch(appendToLeaderBoard(time));
      hasAppend.current = true;
    }
  })
  const handleLeaderboard = ()=>{
    if (isShowLeaderboard) {
    setIsShowLeaderboard(false);
    } else {
      setIsShowLeaderboard(true);

    }
  }

  const buttons = (
    <React.Fragment>
      <div onClick={() => {
        dispatch(popEvent());
        dispatch(resetPlayerStatus());
        dispatch(resetCount());
        dispatch(assignInit(false));
        dispatch(disableBigPopUpPresense());
      }}
      > Play Again</div>
      <div onClick={()=>handleLeaderboard()}> {isShowLeaderboard?"Go back":"See the leaderboard"} </div>
    </React.Fragment>
  );

  return (<BigPopUpWindow buttons={buttons} background={background}>
    {
      isShowLeaderboard?<LearderboardSection />:<><h1>Congrats!</h1>
      <div>You've passed the maze within {time} seconds!</div></>
    }
    
    
  </BigPopUpWindow>);
}

function FailGameEventRender() {
  const dispatch = useDispatch();
  const buttons = (
    <React.Fragment>
      <div onClick={() => {
        dispatch(popEvent());
        dispatch(resetPlayerStatus());
        dispatch(resetCount());
        dispatch(assignInit(false));
        dispatch(disableBigPopUpPresense());
      }}
      > Try again </div>
      <div> See the leaderboard </div>
    </React.Fragment>
  );

  return (<BigPopUpWindow buttons={buttons} background={background}>
    <h1>Oops!</h1>
    <div>You've failed the game (▰˘︹˘▰)!</div>
  </BigPopUpWindow>);
}

// function endEventCallback(dispatch, playGameCompletionSound) {
function endEventCallback(dispatch, play) {
  play();
  dispatch(pauseCount);
  dispatch(popEvent);
}

// With a Strong wind, all buff and debuff are cleared.
// function strongWindEventCallBack(dispatch, playNeutralEffectSound) {
function strongWindEventCallBack(dispatch, play, gameMode) {
  play();
  dispatch(resetBuffAndDebuff());
  if (gameMode === "easy") {
    dispatch(addABuff(DARK_MODE_OFF));
    dispatch(removeADebuff(DARK_MODE_ON));
    dispatch(addABuff(MINI_MAP_ON));
    dispatch(removeADebuff(MINI_MAP_OFF));
  } else if (gameMode === "hard") {
    dispatch(addADebuff(DARK_MODE_ON));
    dispatch(removeABuff(DARK_MODE_OFF));
    dispatch(addADebuff(MINI_MAP_OFF));
    dispatch(removeABuff(MINI_MAP_ON));
  }
}

function StrongWindEventRender() {
  return (
    <SmallPopUpWindow>
      <h1>Wow!</h1>
      <div>You've been applied A strong wind!</div>
      <div>All effects are cleared!</div>
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
    case HP_DOWN_BY_TEN:
      dispatch(decreaseHP(10));
      break;
    default:
      break;
  }
}

function SmellyWindEventRender({ debuffId }) {
  let specificEventContent = null;
  switch (debuffId) {
    case DARK_MODE_ID:
      specificEventContent = "Dark Mode is on!";
      break;
    case SPEED_DOWN_ID:
      specificEventContent = "Your speed is slowed down!";
      break;
    case HIDE_MINI_MAP:
      specificEventContent = "Mini map is gone!"
      break;
    case HP_DOWN_BY_TEN:
      specificEventContent = "Your lost 10 HP!"
      break;
    default:
      break;
  }
  return (<SmallPopUpWindow>
    <h1>Oh no!</h1>
    <div>You met a smelly wind...</div>
    <div>{specificEventContent}</div>
  </SmallPopUpWindow>);
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

function FreshWindEventRender({ buffId }) {
  let specificEventContent = null;
  switch (buffId) {
    case BRIGHT_MODE_ID:
      specificEventContent = "Bright mode is on!";
      break;
    case SPEED_UP_ID:
      specificEventContent = "Your speed is up!";
      break;
    case SHOW_MINI_MAP:
      specificEventContent = "Mini map is shown for you!";
      break;
    case HP_UP_BY_TEN:
      specificEventContent = "Your got 10 HP!";
      break;
    default:
      break;
  }
  return (<SmallPopUpWindow>
    <h1>Great!</h1>
    <div>A fresh wind brought you something helpful! </div>
    <div>{specificEventContent}</div>
  </SmallPopUpWindow>);
}

class Event {
  constructor(toRender, callBack, eventTypeId) {
    this.toRender = toRender;
    this.callBack = callBack;
    this.eventTypeId = eventTypeId;
  }
}

function initEventMap(numX, numZ, gameMode) {
  // console.log("game mode is: " + gameMode);
  const eventMap = Array(numX * numZ + 1).fill(null);
  eventMap[numX * (numZ - 1) + numX - 1] = new Event(<StartEventRender />, startEventCallback, START_GAME_EVENT);
  eventMap[0] = new Event(<EndEventRender />, endEventCallback, END_GAME_EVENT);
  eventMap[numX * numZ + 1] = new Event(<FailGameEventRender />, endEventCallback, GAME_FAIL_EVENT);
  if (gameMode !== "pure") {
    for (let i = numX * (numZ - 1) + numX - 2; i > 0; i--) {
      const eventId = genRandomInt(NUM_EVENT_TYPE);
      switch (eventId) {
        case NEGATIVE_EFFECT_EVENT:
          if (gameMode !== "easy") {
            const debuffId = genRandomInt(NUM_DEBUFF_TYPE + 1);
            eventMap[i] = new Event(<SmellyWindEventRender debuffId={debuffId} />, partialApply(smellyWindEventCallBack, debuffId), NEGATIVE_EFFECT_EVENT);
          }
          break;
        case POSITIVE_EFFECT_EVENT:
          if (gameMode !== "hard") {
            const buffId = genRandomInt(NUM_BUFF_TYPE + 1);
            eventMap[i] = new Event(<FreshWindEventRender buffId={buffId} />, partialApply(freshWindEventCallBack, buffId), POSITIVE_EFFECT_EVENT);
          }
          break;
        case NEUTRAL_EFFECT_EVENT:
          eventMap[i] = new Event(<StrongWindEventRender />, strongWindEventCallBack, NEUTRAL_EFFECT_EVENT);
          break;
        default:
          break;
      }
    }
  }
  return eventMap;
}

export function EventManager({ discovered, posX, posZ, numX, numZ, currentAction, isResetEvent, isGameFail, gameMode }) {
  const [eventMap, setEventMap] = useState(initEventMap(numX, numZ, gameMode));

  const currentRender = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isResetEvent) {
      setEventMap(initEventMap(numX, numZ, gameMode));
      dispatch(assignResetEvent(false));
    }
  });
  const { play: playGameCompletionSound } = useGameCompletionSound();
  const { play: playPositiveEffectSound } = usePositiveEffectSound();
  const { play: playNegativeEffectSound } = useNegativeEffectSound();
  const { play: playNeutralEffectSound } = useNeutralEffectSound();
  const { play } = useBgmPlay();
  // TODO: add confront battle event
  // const { play: playConfrontBattleSound } = useConfrontBattleSound();
  //TODO: add gameover event
  const { play: playGameOverSound } = useGameOverSound();

  let currentIndex = posZ * numX + posX;

  if (isGameFail) {
    currentIndex = numX * numZ + 1;
  }

  let currentCallback = () => { }
  const callBackCommonTail = () => {
    if (currentAction === NOTHING) {
      discovered.current[currentIndex] = true;
    }
  }

  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex]) {
      if (!discovered.current[currentIndex]) {
        const { toRender, callBack, eventTypeId } = eventMap[currentIndex];
        // currentRender.current = eventMap[currentIndex];
        currentRender.current = toRender;
        //toRender = eventMap[currentIndex][0];
        // currentCallback = () => { eventMap[currentIndex][1](dispatch, select); dispatch(enableIsToOpen()) };
        // currentCallback = () => { callback(dispatch, select); dispatch(enableIsToOpen()) };

        switch (eventTypeId) {
          case START_GAME_EVENT:
            currentCallback = () => { callBack(dispatch); dispatch(playBGM()); dispatch(enableBigPopUpIsToOpen()); };
            break;
          case END_GAME_EVENT:
            // currentCallback = () => { callBack(dispatch, playGameCompletionSound); dispatch(enableBigPopUpIsToOpen()); dispatch(assignNumX(numX + 2)); dispatch(assignNumZ(numZ + 2)) };
            currentCallback = () => { callBack(dispatch, playGameCompletionSound); dispatch(stopBGM()); dispatch(enableBigPopUpIsToOpen()); };
            break;
          case POSITIVE_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playPositiveEffectSound); dispatch(enableSmallPopUpIsToOpen()) };
            break;
          case NEGATIVE_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playNegativeEffectSound); dispatch(enableSmallPopUpIsToOpen()) };
            break;
          case NEUTRAL_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playNeutralEffectSound, gameMode); dispatch(enableSmallPopUpIsToOpen()) };
            break;
          case GAME_FAIL_EVENT:
            currentCallback = () => { callBack(dispatch, playGameOverSound); dispatch(stopBGM()); dispatch(enableBigPopUpIsToOpen()); };
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
