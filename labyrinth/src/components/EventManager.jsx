import { useEffect, useRef, useState } from "react";

import {
  usePositiveEffectSound,
  useNegativeEffectSound,
  useGameCompletionSound,
  useConfrontBattleSound,
  useNeutralEffectSound,
  useGameOverSound,
} from "../commons/SoundHooks";

import {
  EVENT_WINDOW,
  enableBigPopUpIsToOpen,
  enableSmallPopUpIsToOpen,
} from "../reducers/popUpWindowSlice";

import { playBGM, stopBGM } from "../reducers/backgroundMusicSlice";
import {
  assignResetEvent,
  NOTHING,
  RANDOM_EVENT,
} from "../reducers/controlSlice";
import {
  initEventMap,
  START_GAME_EVENT,
  END_GAME_EVENT,
  POSITIVE_EFFECT_EVENT,
  NEGATIVE_EFFECT_EVENT,
  CONFRONT_BATTLE_EVENT,
  NEUTRAL_EFFECT_EVENT,
  GAME_FAIL_EVENT,
} from "./Events";
import { useDispatch } from "react-redux";

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
