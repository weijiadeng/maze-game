import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import bgm from '../music/19th_floor_Bobby_Richards.mp3'
import { selectIsMuted, toggleIsMuted } from './backgroundMusicSlice';

const BackgroundMusic = () => {
    const [play, { stop }] = useSound(bgm, {
        interrupt: true,
    });

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
            <button onClick={handlePlay}>Play BGM!</button>;
            <button onClick={() => stop()}>Stop BGM!</button>;
            <button onClick={handleMute}>{mutedButtonContent}</button>
        </React.Fragment>
    );
};

export default BackgroundMusic;