import React, { useEffect, useState } from "react";
import { assignInit, resumeAction } from "../reducers/controlSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
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
} from "../reducers/popUpWindowSlice";
import { genRandomInt } from "../commons/utils";
import background from "../images/bigWindowBackground.png";
import { appendToLeaderBoard } from "../reducers/leaderboardSlice";
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
import { LearderboardSection } from "./Leaderboard";

import styles from "./events.module.css";

import dayIcon from "../images/sun.png";
import nightIcon from "../images/night.png";
import rocket from "../images/rocket.png";
import turtleIcon from "../images/turtleicon.png";
import mapOnIcon from "../images/mapicon.png";
import mapOffIcon from "../images/mapoff.png";
import hpBonusIcon from "../images/hpbonus.png";
// Ref:https://www.flaticon.com/free-icon/battle_1732452
import battleIcon from "../images/battle.png";
// Ref:http://www.clker.com/clipart-wind-icon.html
import windIcon from "../images/strongwind.png";

export const NUM_DEBUFF_TYPE = 3;
const DARK_MODE_ID = 0;
const SPEED_DOWN_ID = 1;
const HIDE_MINI_MAP = 2;

export const NUM_BUFF_TYPE = 4;
const BRIGHT_MODE_ID = 0;
const SPEED_UP_ID = 1;
const SHOW_MINI_MAP = 2;
const HP_UP_BY_TEN = 3;

const RANDOM_ID_MAX = 100;
const RANDOM_ID_WITHHOLD = 33;

// NUM_DEBUFF_TYPE + NUM_BUFF_TYPE + netural event + battle event
const NUM_RANDOM_EVENT_TYPE = NUM_DEBUFF_TYPE + NUM_BUFF_TYPE + 2;

export const POSITIVE_EFFECT_EVENT = 0;
export const NEGATIVE_EFFECT_EVENT = 1;
export const NEUTRAL_EFFECT_EVENT = 2;
export const CONFRONT_BATTLE_EVENT = 3;

export const START_GAME_EVENT = 4;
export const END_GAME_EVENT = 5;
export const GAME_FAIL_EVENT = 6;
export const NOTHING_HAPPENS = 7;

// Render the game start window
export function StartEventRender() {
  const dispatch = useDispatch();
  const buttons = (
    <div
      onClick={() => {
        // Start time count
        dispatch(resumeCount());
        // Unblock player inputs
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

// The callbacks needed to be executed when game starts
export function startEventCallback(dispatch) {
  dispatch(readyCount());
}

// Handle whether show leaderboard logic
function useLeaderBoard() {
  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const handleLeaderboard = () => {
    if (isShowLeaderboard) {
      setIsShowLeaderboard(false);
    } else {
      setIsShowLeaderboard(true);
    }
  };
  return [isShowLeaderboard, handleLeaderboard];
}

// Render the game successfully finish window
export function EndEventRender({ mode }) {
  const time = useSelector(selectCurNumSeconds);
  const [isShowLeaderboard, handleLeaderboard] = useLeaderBoard();
  const [hasAppend, setHasAppend] = useState(false);
  const dispatch = useDispatch();
  // Add player time spent to leader board only once
  useEffect(() => {
    if (!hasAppend) {
      dispatch(appendToLeaderBoard({ mode: mode, value: time }));
      setHasAppend(true);
    }
  }, [hasAppend, dispatch, mode, time]);

  const buttons = (
    <React.Fragment>
      <div
        onClick={() => {
          // Unblock player inputs
          dispatch(resumeAction());
          // Reset player status
          dispatch(resetPlayerStatus());
          // Reset time count
          dispatch(resetCount());
          // Reinitialize the maze, including
          // the maze layout and random events
          dispatch(assignInit(false));
          dispatch(disableBigPopUpPresense());
        }}
      >
        Play Again
      </div>
      <GoHomeButton />
      <div onClick={() => handleLeaderboard()}>
        {isShowLeaderboard ? "Go back" : "Check leaderboard"}
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
        <LearderboardSection mode={mode} />
      ) : (
        <>
          <h1>Congrats!</h1>
          <div>You've passed the maze within {time} seconds!</div>
        </>
      )}
    </BigPopUpWindow>
  );
}

const GoHomeButton = () => {
  const history = useHistory();

  return <div onClick={() => history.push("/")}>Home</div>;
};

// Render the game fail window
export function FailGameEventRender({ mode }) {
  const dispatch = useDispatch();
  const [isShowLeaderboard, handleLeaderboard] = useLeaderBoard();

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
        Try again
      </div>
      <GoHomeButton />
      <div onClick={() => handleLeaderboard()}>
        {isShowLeaderboard ? "Go back" : "Check leaderboard"}
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
        <LearderboardSection mode={mode} />
      ) : (
        <>
          <h1>Oops!</h1>
          <div>You've failed the game (▰˘︹˘▰)!</div>
        </>
      )}
    </BigPopUpWindow>
  );
}

export function endEventCallback(play) {
  play();
}

// With a Strong wind, all buff and debuff are cleared.
export function strongWindEventCallBack(dispatch, play, gameMode) {
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

export function StrongWindEventRender() {
  return (
    <SmallPopUpWindow>
      <img className={styles.icon} src={windIcon} alt="Strong wind" />
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
export function smellyWindEventCallBack(debuffId, dispatch, play) {
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

export function confrontBattleCallBack(HP, dispatch, play) {
  play();
  dispatch(decreaseHP(HP));
}

// Render the negative event window
export function SmellyWindEventRender({ debuffId }) {
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

// Render the battle event window
export function BattleEventRender({ HP }) {
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

// Render the positive event window
export function FreshWindEventRender({ buffId }) {
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
export function freshWindEventCallBack(buffId, dispatch, play) {
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

// Initialize the eventMap according to the maze size and gameMode
export function initEventMap(numX, numZ, gameMode) {
  const eventMap = Array(numX * numZ + 1).fill(NOTHING_HAPPENS);

  // The start point is always (numX-1, numZ-1)
  eventMap[numX * (numZ - 1) + numX - 1] = START_GAME_EVENT;
  // The end point is always (0, 0)
  eventMap[0] = END_GAME_EVENT;
  // The fail point is a specaial index, it does match any map position
  eventMap[numX * numZ + 1] = GAME_FAIL_EVENT;

  // Pure mode does not have any random events, so skip this part.
  if (gameMode !== "pure") {
    for (let i = numX * (numZ - 1) + numX - 2; i > 0; i--) {
      const randomID = genRandomInt(RANDOM_ID_MAX);
      // Make only about RANDOM_ID_WITHHOLD/RANDOM_ID_MAX cells have events
      if (randomID < RANDOM_ID_WITHHOLD) {
        // Among all the events, 1/(NUM_BUFF_TYPE + NUM_DEBUFF_TYPE + 1) event is netural
        if (randomID < RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) {
          eventMap[i] = NEUTRAL_EFFECT_EVENT;
        } else if (
          // Among all the events, 2/(NUM_BUFF_TYPE + NUM_DEBUFF_TYPE + 1) event will be battles
          randomID <
          (RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) * 3
        ) {
          eventMap[i] = CONFRONT_BATTLE_EVENT;
        } else if (
          // Among all the events, (NUM_BUFF_TYPE+1)/(NUM_BUFF_TYPE + NUM_DEBUFF_TYPE + 1) event will be positive
          randomID <
          (RANDOM_ID_WITHHOLD / NUM_RANDOM_EVENT_TYPE) * (4 + NUM_BUFF_TYPE)
        ) {
          eventMap[i] = POSITIVE_EFFECT_EVENT;
        } else {
          // The rest are negative
          eventMap[i] = NEGATIVE_EFFECT_EVENT;
        }
      }
    }
  }
  return eventMap;
}
