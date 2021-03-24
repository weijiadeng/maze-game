import React from 'react';
import useSound from 'use-sound';
import bgm from '../music/mixkit-game-level-music-689.wav'

export function useBgmPlay() {
    const [play, { stop }] = useSound(bgm, {
        interrupt: true,
        volume: 0.35,
        loop: true,
    });
    return { play, stop };
}

export const BackgroundMusic = () => {
    return (
        <React.Fragment>
        </React.Fragment>
    );
};
