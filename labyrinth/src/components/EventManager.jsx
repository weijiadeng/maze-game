import React, { useEffect, useRef, useState } from "react";
import { NOTHING, popEvent, RANDOM_EVENT, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../reducers/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { readyCount, selectCurNumSeconds, resumeCount, pauseCount } from '../reducers/elapseTimerSlice'
import { decreaseHP, increaseHP, resetBuffAndDebuff } from "../reducers/playerStatusSlice";
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, speedDown, speedUp } from "../reducers/gameStatusSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import SmallPopUpWindow from "./SmallPopUpWindow";
import { disablePresense, enableIsToOpen } from "../reducers/smallPopUpWindowSlice";
import { partialApply, genRandomInt } from "../commons/utils";
import background from '../images/bigWindowBackground.png'
import { appendToLeaderBoard } from "../reducers/leaderboardSlice";
import { usePositiveEffectSound, useNegativeEffectSound, useGameCompletionSound, useNeutralEffectSound } from "../commons/SoundHooks"

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

const START_GAME_EVENT = 0;
const END_GAME_EVENT = 1;
const POSITIVE_EFFECT_EVENT = 2;
const NEGATIVE_EFFECT_EVENT = 3;
const NEUTRAL_EFFECT_EVENT = 4;
const CONFRONT_BATTLE_EVENT = 5;

function StartEventRender() {
  const dispatch = useDispatch();
  const buttons = (<div onClick={() => {
    dispatch(resumeCount());
    dispatch(popEvent());
    dispatch(disablePresense());
  }}>Emm...Interesting</div>);
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
  const [hasAppend, setHasAppend] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAppend) {
      dispatch(appendToLeaderBoard(time));
      setHasAppend(true);
    }
  });
  const buttons = (
    <React.Fragment>
      <div onClick={() => {
        dispatch(popEvent());
        dispatch(disablePresense());
      }}
      >Emm...Interesting</div>
      <div>See the leaderboard</div>
    </React.Fragment>
  );

  return (<BigPopUpWindow buttons={buttons} background={background}>
    <h1>Congrats!</h1>
    <div>You've passed the maze within {time} seconds!</div>
  </BigPopUpWindow>);
}

// function endEventCallback(dispatch, playGameCompletionSound) {
function endEventCallback(dispatch, play) {
  play();
  dispatch(pauseCount);
}

// With a Strong wind, all buff and debuff are cleared.
// function strongWindEventCallBack(dispatch, playNeutralEffectSound) {
function strongWindEventCallBack(dispatch, play) {
  play();
  dispatch(resetBuffAndDebuff());
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
      dispatch(enableDarkMode());
      break;
    case SPEED_DOWN_ID:
      dispatch(speedDown());
      break;
    case HIDE_MINI_MAP:
      dispatch(disableMiniMap());
      break;
    case HP_DOWN_BY_TEN:
      dispatch(decreaseHP());
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
      dispatch(disableDarkMode());
      break;
    case SPEED_UP_ID:
      dispatch(speedUp());
      break;
    case SHOW_MINI_MAP:
      dispatch(enableMiniMap());
      break;
    case HP_UP_BY_TEN:
      dispatch(increaseHP());
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

function initEventMap(numX, numZ) {
  const eventMap = Array(numX * numZ).fill(null);
  // eventMap[numX * (numZ - 1) + numX - 1] = [<StartEventRender />, startEventCallback];
  eventMap[numX * (numZ - 1) + numX - 1] = new Event(<StartEventRender />, startEventCallback, START_GAME_EVENT);
  // eventMap[0] = [<EndEventRender />, endEventCallback];
  eventMap[0] = new Event(<EndEventRender />, endEventCallback, END_GAME_EVENT);
  for (let i = numX * (numZ - 1) + numX - 2; i > 0; i--) {
    const eventId = genRandomInt(4);
    switch (eventId) {
      case NEGATIVE_EFFECT_EVENT: const debuffId = genRandomInt(NUM_DEBUFF_TYPE);
        eventMap[i] = new Event(<SmellyWindEventRender debuffId={debuffId} />, partialApply(smellyWindEventCallBack, debuffId), NEGATIVE_EFFECT_EVENT);
        break;
      case POSITIVE_EFFECT_EVENT: const buffId = genRandomInt(NUM_BUFF_TYPE);
        eventMap[i] = new Event(<FreshWindEventRender buffId={buffId} />, partialApply(freshWindEventCallBack, buffId), POSITIVE_EFFECT_EVENT);
        break;
      case NEUTRAL_EFFECT_EVENT:
        eventMap[i] = new Event(<StrongWindEventRender />, strongWindEventCallBack, NEUTRAL_EFFECT_EVENT);
        break;
      default:
    }
  }
  return eventMap;
}

export function EventManager({ discovered }) {
  const numX = useSelector(selectNumX);
  const numZ = useSelector(selectNumZ);
  const [eventMap,] = useState(initEventMap(numX, numZ));
  const currentRender = useRef(null);
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const currentIndex = posZ * numX + posX;
  const currentAction = useSelector(selectAction);
  const dispatch = useDispatch();
  const { play: playGameCompletionSound } = useGameCompletionSound();
  const { play: playPositiveEffectSound } = usePositiveEffectSound();
  const { play: playNegativeEffectSound } = useNegativeEffectSound();
  const { play: playNeutralEffectSound } = useNeutralEffectSound();
  // TODO: add confront battle event
  // const { play: playConfrontBattleSound } = useConfrontBattleSound();
  //TODO: add gameover event
  // const { play: playGameOverSound } = useGameOverSound();

  let currentCallback = () => { };
  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex] !== null && eventMap[currentIndex] !== undefined) {
      if (!discovered.current[currentIndex]) {
        const { toRender, callBack, eventTypeId } = eventMap[currentIndex];
        // currentRender.current = eventMap[currentIndex];
        currentRender.current = toRender;
        //toRender = eventMap[currentIndex][0];
        // currentCallback = () => { eventMap[currentIndex][1](dispatch, select); dispatch(enableIsToOpen()) };
        // currentCallback = () => { callback(dispatch, select); dispatch(enableIsToOpen()) };

        switch (eventTypeId) {
          case END_GAME_EVENT:
            currentCallback = () => { callBack(dispatch, playGameCompletionSound); dispatch(enableIsToOpen()) };
            break;
          case POSITIVE_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playPositiveEffectSound); dispatch(enableIsToOpen()) };
            break;
          case NEGATIVE_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playNegativeEffectSound); dispatch(enableIsToOpen()) };
            break;
          case NEUTRAL_EFFECT_EVENT:
            currentCallback = () => { callBack(dispatch, playNeutralEffectSound); dispatch(enableIsToOpen()) };
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
  useEffect(currentCallback);
  return currentRender.current;
}
