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
import { assignResetEvent, NOTHING, selectAction, selectPosX, selectPosZ } from "../reducers/controlSlice";
import {
  initEventMap,
  START_GAME_EVENT,
  END_GAME_EVENT,
  POSITIVE_EFFECT_EVENT,
  NEGATIVE_EFFECT_EVENT,
  CONFRONT_BATTLE_EVENT,
  NEUTRAL_EFFECT_EVENT,
  GAME_FAIL_EVENT,
  NUM_BUFF_TYPE,
  NUM_DEBUFF_TYPE,
  startEventCallback,
  endEventCallback,
  FailGameEventRender,
  StrongWindEventRender,
  BattleEventRender,
  SmellyWindEventRender,
  StartEventRender,
  EndEventRender,
  FreshWindEventRender,
  freshWindEventCallBack,
  smellyWindEventCallBack,
  strongWindEventCallBack,
  confrontBattleCallBack,
} from "./Events";
import { useDispatch, useSelector } from "react-redux";
import { genRandomInt } from "../commons/utils";
import { selectHP, selectIsTimeUsedUp } from "../reducers/playerStatusSlice";

// The componments responsible for incurring events according to game state and
// position, including render the event pop up window and execute the event callback.
export default function EventManager({
  discovered,
  numX,
  numZ,
  isResetEvent,
  gameMode,
}) {
  // eventMap stores which event should occur at which position
  const [eventMap, setEventMap] = useState(initEventMap(numX, numZ, gameMode));
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const currentAction = useSelector(selectAction);
  // The current rendering event, use ref to preserve the rendered window when go
  // to another blank cell. Do not use state because we only want to rerender based
  // on the position change and isGameFail change.
  const currentRender = useRef(<></>);
  // If we need to restart the game, we need to reset all the events again.
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
  const { play: playConfrontBattleSound } = useConfrontBattleSound();
  const { play: playGameOverSound } = useGameOverSound();

  // Convert the two dimension position index to one dimension index in the array
  let currentIndex = posZ * numX + posX;
  const isTimeUsedUp = useSelector(selectIsTimeUsedUp);
  const currentHP = useSelector(selectHP);
  const isGameFail =
    gameMode === "pure" ? false : currentHP <= 0 || isTimeUsedUp;

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
    if (!discovered.current[currentIndex]) {
      switch (eventMap[currentIndex]) {
        case START_GAME_EVENT:
          currentRender.current = <StartEventRender />;
          currentCallback = () => {
            startEventCallback(dispatch);
            dispatch(playBGM());
            dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
          };
          break;
        case END_GAME_EVENT:
          currentRender.current = <EndEventRender mode={gameMode} />;
          currentCallback = () => {
            endEventCallback(playGameCompletionSound);
            dispatch(stopBGM());
            dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
          };
          break;
        case POSITIVE_EFFECT_EVENT:
          const buffId = genRandomInt(NUM_BUFF_TYPE);
          currentRender.current = <FreshWindEventRender buffId={buffId} />;
          currentCallback = () => {
            freshWindEventCallBack(buffId, dispatch, playPositiveEffectSound);
            dispatch(enableSmallPopUpIsToOpen());
          };
          break;
        case NEGATIVE_EFFECT_EVENT:
          const debuffId = genRandomInt(NUM_DEBUFF_TYPE);
          currentRender.current = <SmellyWindEventRender debuffId={debuffId} />;
          currentCallback = () => {
            smellyWindEventCallBack(
              debuffId,
              dispatch,
              playNegativeEffectSound
            );
            dispatch(enableSmallPopUpIsToOpen());
          };
          break;
        case CONFRONT_BATTLE_EVENT:
          const HP = genRandomInt(40) + 1;
          currentRender.current = <BattleEventRender HP={HP} />;
          currentCallback = () => {
            confrontBattleCallBack(HP, dispatch, playConfrontBattleSound);
            dispatch(enableSmallPopUpIsToOpen());
          };
          break;
        case NEUTRAL_EFFECT_EVENT:
          currentRender.current = <StrongWindEventRender mode={gameMode} />;
          currentCallback = () => {
            strongWindEventCallBack(dispatch, playNeutralEffectSound, gameMode);
            dispatch(enableSmallPopUpIsToOpen());
          };

          break;
        case GAME_FAIL_EVENT:
          currentCallback = () => {
            currentRender.current = <FailGameEventRender mode={gameMode} />;
            endEventCallback(playGameOverSound);
            dispatch(stopBGM());
            dispatch(enableBigPopUpIsToOpen(EVENT_WINDOW));
          };
          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    currentCallback();
    callBackCommonTail();
  });
  return currentRender.current;
}
