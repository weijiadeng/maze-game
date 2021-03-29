import React, { useEffect, useState } from 'react';
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
    const {play, stop} = useBgmPlay();
    const isPlaying = useState(true);
    return (
        <React.Fragment>
        </React.Fragment>
    );
};
