import React, { useEffect, useState } from "react";
import { NOTHING, popEvent, RANDOM_EVENT, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../reducers/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { readyCount, selectCurNumSeconds, resumeCount } from '../reducers/elapseTimerSlice'
import { resetBuffAndDebuff } from "../reducers/playerStatusSlice";
import { disableDarkMode, disableMiniMap, enableDarkMode, enableMiniMap, selectIsDark, selectShowMiniMap, selectSpeedModifier, speedDown, speedUp } from "../reducers/gameStatusSlice";
import SmallPopUpWindow from "./SmallPopUpWindow";
import { selectPresense, enablePresense, disablePresense, enableIsToOpen } from "../reducers/smallPopUpWindowSlice";
import { partialApply } from "../commons/utils";
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
  return (<SmallPopUpWindow buttons={buttons} background={background}>
    <h1>You are in a maze</h1>
    <div>This is a dangerous maze, good luck!</div>
  </SmallPopUpWindow>);
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

  return (<SmallPopUpWindow buttons={buttons} background={background}>
    <h1>Congrats!</h1>
    <div>You've passed the maze within {time} seconds!</div>
  </SmallPopUpWindow>);
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

function genDebuffId() {
  return Math.floor(Math.random() * NUM_DEBUFF_TYPE);
}


// The smelly wind will add debuff: darkmode, minimap off, slowly move.
function smellyWindEventCallBack(debuffID, dispatch, select) {
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

function SmellyWindEventRender({debuffId}) {
  const dispatch = useDispatch();
  const buttons = (<div onClick={() => { handleClosePopUp(dispatch) }}>Emm...Interesting</div>);
  return (<SmallPopUpWindow buttons={buttons}>
    <h1>Opps!</h1>
    <div>You've been applied {debuffId}!</div>
  </SmallPopUpWindow>);
}

// With a Fresh wind, one buff is added: brightmode, minimap on, faster move.
function freshWindEventCallBack(dispatch, select) {
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


 

function freshWindEventRender() {
  return (<div></div>);
}

function initEventMap(numX, numZ) {
  const eventMap = Array(numX * numZ).fill(null);
  eventMap[numX * (numZ - 1) + numX - 1] = [<StartEventRender />, startEventCallback];
  eventMap[0] = [<EndEventRender />, endEventCallback];
  // for (let i=numX * (numZ - 1) + numX - 2; i>0; i--) {
  //   const defbuffId = genDebuffId();
  //   eventMap[i] = [<SmellyWindEventRender debuffId={defbuffId}/>, partialApply(smellyWindEventCallBack, 1)];
  // }
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
  if (currentAction === NOTHING || currentAction === RANDOM_EVENT) {
    if (eventMap[currentIndex] !== null && eventMap[currentIndex] !== undefined) {

      toRender = eventMap[currentIndex][0];
      if (!discovered.current[currentIndex]) {
        //toRender = eventMap[currentIndex][0];
        currentCallback = () => { eventMap[currentIndex][1](dispatch, select); dispatch(enableIsToOpen()) };
      }
    }
  }
  useEffect(currentCallback);
  return (toRender);
}
