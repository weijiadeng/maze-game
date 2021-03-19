import React, { useEffect, useRef, useState } from "react";
import { NOTHING, popEvent, RANDOM_EVENT, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../reducers/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { readyCount, selectCurNumSeconds, resumeCount } from '../reducers/elapseTimerSlice'
import { resetBuffAndDebuff } from "../reducers/playerStatusSlice";
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, selectIsDark, selectShowMiniMap, selectSpeedModifier, speedDown, speedUp } from "../reducers/gameStatusSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import SmallPopUpWindow from "./SmallPopUpWindow";
import { selectPresense, enablePresense, disablePresense, enableIsToOpen } from "../reducers/smallPopUpWindowSlice";
import { partialApply, genRandomInt } from "../commons/utils";
import background from './scroll.png'

const NUM_DEBUFF_TYPE = 3;
const DARK_MODE_ID = 0;
const SPEED_DOWN_ID = 1;
const HIDE_MINI_MAP = 2;

const NUM_BUFF_TYPE = 3;
const BRIGHT_MODE_ID = 0;
const SPEED_UP_ID = 1;
const SHOW_MINI_MAP = 2;

const handleClosePopUp = (dispatch) => {
  dispatch(resumeCount());
  dispatch(popEvent());
  dispatch(disablePresense());
  //setTimeout(resetPresenseToTrue, 1000)
}

function StartEventRender() {
  const dispatch = useDispatch();
  const buttons = (<div onClick={() => { handleClosePopUp(dispatch) }}>Emm...Interesting</div>);
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
  const dispatch = useDispatch();
  const buttons = (
    <React.Fragment>
      <div onClick={() => { handleClosePopUp(dispatch) }}
      >Emm...Interesting</div>
      <div>See the leaderboard</div>
    </React.Fragment>
  );

  return (<BigPopUpWindow buttons={buttons} background={background}>
    <h1>Congrats!</h1>
    <div>You've passed the maze within {time} seconds!</div>
  </BigPopUpWindow>);
}

function endEventCallback(dispatch) {
  alert("Congrats! You've passed the game!");
}

// With a Strong wind, all buff and debuff are cleared.
function strongWindEventCallBack(dispatch) {
  dispatch(resetBuffAndDebuff());
}

function strongWindEventRender() {
  return (<div></div>);
}


// The smelly wind will add debuff: darkmode, minimap off, slowly move.
function smellyWindEventCallBack(debuffID, dispatch) {
  console.log(debuffID);
  // Generate a random debuff
  switch (debuffID) {
    case DARK_MODE_ID:
      dispatch(enableDarkMode());
      break;
    case SPEED_DOWN_ID:
      dispatch(speedDown());
      break;
    case HIDE_MINI_MAP:
      dispatch(disableMiniMap());
      break;
    default:
      break;
  }
}

function SmellyWindEventRender({ debuffId }) {
  return (<SmallPopUpWindow>
    <h1>Opps!</h1>
    <div>You've been applied {debuffId}!</div>
  </SmallPopUpWindow>);
}

// With a Fresh wind, one buff is added: brightmode, minimap on, faster move.
function freshWindEventCallBack(debuffID, dispatch) {
  // Generate a random buff
  const buffID = Math.floor(Math.random() * NUM_BUFF_TYPE);
  switch (buffID) {
    case BRIGHT_MODE_ID:
      dispatch(disableDarkMode());
      break;
    case SPEED_UP_ID:
      dispatch(speedUp());
      break;
    case SHOW_MINI_MAP:
      dispatch(enableMiniMap());
      break;

    default:
      break;
  }
}

function FreshWindEventRender({ buffId }) {
  return (<SmallPopUpWindow>
    <h1>Wonderful!</h1>
    <div>You've been applied {buffId}!</div>
  </SmallPopUpWindow>);
}

function initEventMap(numX, numZ) {
  const eventMap = Array(numX * numZ).fill(null);
  eventMap[numX * (numZ - 1) + numX - 1] = [<StartEventRender />, startEventCallback];
  eventMap[0] = [<EndEventRender />, endEventCallback];
  for (let i = numX * (numZ - 1) + numX - 2; i > 0; i--) {
    const eventId = genRandomInt(3);
    switch (eventId) {
      case 0: const defbuffId = genRandomInt(NUM_DEBUFF_TYPE);
        eventMap[i] = [<SmellyWindEventRender debuffId={defbuffId} />, partialApply(smellyWindEventCallBack, defbuffId)];
        break;
      case 1: const buffId = genRandomInt(NUM_BUFF_TYPE);
        eventMap[i] = [<FreshWindEventRender buffId={buffId} />, partialApply(freshWindEventCallBack, buffId)];
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
  const smallPopUpWindowPresense = useSelector(selectPresense);
  const dispatch = useDispatch();
  const select = useSelector;
  let currentCallback = () => { };
  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex] !== null && eventMap[currentIndex] !== undefined) {

      if (!discovered.current[currentIndex]) {
        currentRender.current = eventMap[currentIndex][0];
        //toRender = eventMap[currentIndex][0];
        currentCallback = () => { eventMap[currentIndex][1](dispatch, select); dispatch(enableIsToOpen()) };
      }
    }
  }
  useEffect(currentCallback);
  return currentRender.current;
}
