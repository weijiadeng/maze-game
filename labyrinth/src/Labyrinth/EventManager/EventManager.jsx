import React, { useEffect, useState } from "react";
import { NOTHING, occurEvent, RANDOM_EVENT, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../Controls/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { readyCount, selectCurNumSeconds } from '../elapseTimerSlice'
import { resetBuffAndDebuff } from "../../reducers/playerStatusSlice";
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, selectIsDark, selectShowMiniMap, selectSpeedModifier, speedDown, speedUp } from "../GameStatus/gameStatusSlice";
import SmallPopUpWindow from "../../components/SmallPopUpWindow";
import { selectPresense, enablePresense, disablePresense } from "../../reducers/smallPopUpWindowSlice";

const NUM_DEBUFF_TYPE = 3;
const DARK_MODE_ID = 0;
const SPEED_DOWN_ID = 1;
const HIDE_MINI_MAP = 2;

const NUM_BUFF_TYPE = 3;
const BRIGHT_MODE_ID = 0;
const SPEED_UP_ID = 1;
const SHOW_MINI_MAP = 2;


function StartEventRender() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(disablePresense());
  }
  return (<React.Fragment>
    <h1>You are in a maze</h1>
    <div>This is a dangerous maze, good luck!</div>
  </React.Fragment>);
}

function startEventCallback(dispatch) {
  dispatch(readyCount());
}

function EndEventRender() {
  const time = useSelector(selectCurNumSeconds);
  return (<React.Fragment>
    <h1>Congrats!</h1>
    <div>You've passed the maze within {time} seconds!</div>
  </React.Fragment>);
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
function smellyWindEventCallBack(dispatch, select) {
  // Generate a random debuff
  const debuffID = Math.floor(Math.random() * NUM_DEBUFF_TYPE);
  switch (debuffID) {
    case DARK_MODE_ID:
      const isDark = select(selectIsDark);
      if (!isDark) {
        dispatch(enableDarkMode());
      }
      break;
    case SPEED_DOWN_ID:
      dispatch(speedDown());
      break;
    case HIDE_MINI_MAP:
      const isShowMiniMap = select(selectShowMiniMap);
      if (isShowMiniMap) {
        dispatch(disableMiniMap());
      }
      break;

    default:
      break;
  }
}

function smellyWindEventRender() {
  return (<div></div>);
}

// With a Fresh wind, one buff is added: brightmode, minimap on, faster move.
function freshWindEventCallBack(dispatch, select) {
  // Generate a random buff
  const buffID = Math.floor(Math.random() * NUM_BUFF_TYPE);
  switch (buffID) {
    case BRIGHT_MODE_ID:
      const isDark = select(selectIsDark);
      if (isDark) {
        dispatch(disableDarkMode());
      }
      break;
    case SPEED_UP_ID:
      dispatch(speedUp());
      break;
    case SHOW_MINI_MAP:
      const isShowMiniMap = select(selectShowMiniMap);
      if (!isShowMiniMap) {
        dispatch(enableMiniMap());
      }
      break;

    default:
      break;
  }
}

function freshWindEventRender() {
  return (<div></div>);
}

function initEventMap(numX, numZ) {
  const eventMap = Array(numX * numZ).fill(null);
  eventMap[numX * (numZ - 1) + numX - 1] = [<StartEventRender />, startEventCallback];
  eventMap[0] = [<EndEventRender />, endEventCallback];
  return eventMap;
}

export function EventManager({ discovered }) {
  const numX = useSelector(selectNumX);
  const numZ = useSelector(selectNumZ);
  const [eventMap,] = useState(initEventMap(numX, numZ));
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const currentIndex = posZ * numX + posX;
  const currentAction = useSelector(selectAction);
  const smallPopUpWindowPresense = useSelector(selectPresense);
  const dispatch = useDispatch();
  const select = useSelector;
  let currentCallback = () => { };
  let toRender = null;
  let isToOpen = false;
  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex] !== null && eventMap[currentIndex] !== undefined) {

      toRender = eventMap[currentIndex][0];
      if (!discovered.current[currentIndex]) {
        //toRender = eventMap[currentIndex][0];
        currentCallback = () => { eventMap[currentIndex][1](dispatch, select);};
        isToOpen = true;
      }
    }
  }
  useEffect(currentCallback);
  return (
    <SmallPopUpWindow isToOpen={isToOpen}>
      {toRender}
    </SmallPopUpWindow>
  );
}
