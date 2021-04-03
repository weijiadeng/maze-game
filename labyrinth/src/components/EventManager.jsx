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

// The componments responsible for incurring events according to game state and
// position, including render the event pop up window and execute the event callback.
export default function EventManager({
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
  // eventMap stores which event should occur at which position
  const [eventMap, setEventMap] = useState(initEventMap(numX, numZ, gameMode));

  // The current rendering event, use ref to preserve the rendered window when go
  // to another blank cell. Do not use state because we only want to rerender based
  // on the position change and isGameFail change.
  const currentRender = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // If we need to restart the game, we need to reset all the events again.
    if (isResetEvent) {
      setEventMap(initEventMap(numX, numZ, gameMode));
      dispatch(assignResetEvent(false));
    }
  }, [isResetEvent, numX, numZ, gameMode, dispatch]);
  const { play: playGameCompletionSound } = useGameCompletionSound();
  const { play: playPositiveEffectSound } = usePositiveEffectSound();
  const { play: playNegativeEffectSound } = useNegativeEffectSound();
  const { play: playNeutralEffectSound } = useNeutralEffectSound();
  const { play: playConfrontBattleSound } = useConfrontBattleSound();
  const { play: playGameOverSound } = useGameOverSound();

  // Convert the two dimension position index to one dimension index in the array
  let currentIndex = posZ * numX + posX;

  // GameFail event is treated as a special event within the eventmap, it's the last
  // element of the map.
  if (isGameFail) {
    currentIndex = numX * numZ + 1;
  }
  // The event callbacks
  let currentCallback = () => {};
  // This is called after the event callback is executed.
  const callBackCommonTail = () => {
    if (currentAction === NOTHING) {
      // Mark the position discovered at the end of each callback
      discovered.current[currentIndex] = true;
    }
  };
  // Only call events when the moving animation is finished, and the
  // game is not paused.
  if (currentAction === NOTHING) {
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
