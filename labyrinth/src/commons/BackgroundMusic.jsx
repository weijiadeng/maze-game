import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
// Music credits to https://mixkit.co/free-sound-effects/game/.
import bgm from "../music/mixkit-game-level-music-689.wav";
import {
  playingBGM,
  selectIsPlaying,
  stopedBGM,
  START_PLAY,
  STOPPED,
  TO_STOP,
  TO_MUTE,
  mutedBGM,
} from "../reducers/backgroundMusicSlice";

export function useBgmPlay() {
  const [play, { stop }] = useSound(bgm, {
    interrupt: true,
    volume: 0.35,
    loop: true,
  });
  return { play, stop };
}

export const BackgroundMusic = () => {
  const { play, stop } = useBgmPlay();
  const isPlaying = useSelector(selectIsPlaying);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPlaying === START_PLAY) {
      play();
      dispatch(playingBGM());
    }
    if (isPlaying === TO_STOP) {
      stop();
      dispatch(stopedBGM());
    }
    if (isPlaying === TO_MUTE) {
      stop();
      dispatch(mutedBGM());
    }
  });
  return <React.Fragment></React.Fragment>;
};
