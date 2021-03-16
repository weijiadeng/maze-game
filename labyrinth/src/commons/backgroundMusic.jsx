import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import bgm from '../music/mixkit-game-level-music-689.wav'
import { selectIsMuted, toggleIsMuted } from './backgroundMusicSlice';

function useBgmPlay() {
    const [play, { stop }] = useSound(bgm, {
        interrupt: true,
        volume: 0.35,
    });
    return { play, stop };
}

const BackgroundMusic = () => {
    const { play, stop } = useBgmPlay();

    const isMuted = useSelector(selectIsMuted);
    const dispatch = useDispatch();
    const handlePlay = () => {
        play();
        dispatch(toggleIsMuted());
    }
    const handleMute = () => {
        if (isMuted) {
            stop();
        } else {
            play();
        }
        dispatch(toggleIsMuted());
    }

    const mutedButtonContent = isMuted ? "Mute" : "Unmute";
    return (
        <React.Fragment>
            <button onClick={() => play()}>Play BGM!</button>;
            <button onClick={() => stop()}>Stop BGM!</button>;
            <button onClick={handleMute}>{mutedButtonContent}</button>
        </React.Fragment>
    );
};

export default BackgroundMusic;