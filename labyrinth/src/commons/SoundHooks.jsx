import React from "react";
import useSound from "use-sound";
// The following 7 music pieces credit to https://mixkit.co/free-sound-effects/game/.
import GameCompletionSound from "../music/mixkit-game-level-completed-2059.wav";
import PositiveEffectSound from "../music/mixkit-video-game-health-recharge-2837.wav";
import NegativeEffectSound from "../music/mixkit-negative-guitar-tone-2324.wav";
import NeutralEffectSound from "../music/mixkit-bonus-extra-in-a-video-game-2064.wav";
import ConfrontBattleSound from "../music/mixkit-arcade-retro-jump-223.wav";
import HitWallSound from "../music/mixkit-small-hit-in-a-game-2072.wav";
import GameOverSound from "../music/mixkit-player-losing-or-failing-2042.wav";
import { useDispatch, useSelector } from "react-redux";
import {
  MUTED,
  selectIsPlaying,
  TO_MUTE,
} from "../reducers/backgroundMusicSlice";
import {
  resetLastMoveHitWall,
  selectLastMoveHitWall,
} from "../reducers/controlSlice";

export function useGameCompletionSound() {
  const [playSound, { stop }] = useSound(GameCompletionSound, {
    interrupt: true,
    volume: 0.75,
  });
  const isPlaying = useSelector(selectIsPlaying);
  // When the muted is set, do not play any sound effect.
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

export function usePositiveEffectSound() {
  const [playSound, { stop }] = useSound(PositiveEffectSound, {
    interrupt: true,
    volume: 0.45,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

export function useNegativeEffectSound() {
  const [playSound, { stop }] = useSound(NegativeEffectSound, {
    interrupt: true,
    volume: 0.65,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

// Clears all effects, no matter positive or negative.
export function useNeutralEffectSound() {
  const [playSound, { stop }] = useSound(NeutralEffectSound, {
    interrupt: true,
    volume: 0.65,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

export function useConfrontBattleSound() {
  const [playSound, { stop }] = useSound(ConfrontBattleSound, {
    interrupt: true,
    volume: 0.65,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

export function useGameOverSound() {
  const [playSound, { stop }] = useSound(GameOverSound, {
    interrupt: true,
    volume: 0.65,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

export function useHitWallSound() {
  const [playSound, { stop }] = useSound(HitWallSound, {
    interrupt: true,
    volume: 0.65,
  });
  const isPlaying = useSelector(selectIsPlaying);
  const play = () => {
    if (isPlaying !== MUTED || isPlaying !== TO_MUTE) {
      playSound();
    }
  };
  return { play, stop };
}

// Manage play sound effects
export function SoundEffectManager() {
  const dispatch = useDispatch();
  const isPlayHitWall = useSelector(selectLastMoveHitWall);
  const { play } = useHitWallSound();
  if (isPlayHitWall) {
    play();
    dispatch(resetLastMoveHitWall());
  }
  return <></>;
}
