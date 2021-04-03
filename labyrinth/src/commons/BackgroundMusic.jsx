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
  TO_STOP,
  TO_MUTE,
  mutedBGM,
} from "../reducers/backgroundMusicSlice";

function useBgmPlay() {
  const [play, { stop }] = useSound(bgm, {
    interrupt: true,
    volume: 0.35,
    loop: true,
  });
  return { play, stop };
}

// Manage whether to play or stop BGM according to the value isPlaying
const BackgroundMusic = () => {
  const { play, stop } = useBgmPlay();
  const isPlaying = useSelector(selectIsPlaying);
  const dispatch = useDispatch();
  useEffect(() => {
    // A request for playing the BGM is sent
    if (isPlaying === START_PLAY) {
      play();
      // playingBGM() change the isPlaying to PLAYING. this is to ensure we
      // only play the BGM once each time a dispatch(playBGM()) is called
      dispatch(playingBGM());
    }
    // A request for stopping the BGM is sent
    if (isPlaying === TO_STOP) {
      stop();
      // stopedBGM() change the isPlaying to STOPPED. this is to ensure we
      // only stop the BGM once each time a dispatch(stopBGM()) is called
      dispatch(stopedBGM());
    }
    // A request for muting the BGM is sent.
    if (isPlaying === TO_MUTE) {
      stop();
      // mutedBGM() change the isPlaying to MUTED. this is to ensure we
      // only mute the BGM once each time a dispatch(stopBGM()) is called
      dispatch(mutedBGM());
    }
  }, [isPlaying, play, stop, dispatch]);
  return <React.Fragment></React.Fragment>;
};

export default BackgroundMusic;
