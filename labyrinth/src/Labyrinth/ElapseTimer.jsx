import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurNumSeconds, countUp, pauseCount, resumeCount } from './elapseTimerSlice'

// A timer recording elapse time.
export default function ElapseTimer() {
    const dispatch = useDispatch();
    const handleCountUpDispatch = () => {
        dispatch(countUp());
    }
    const handlePauseCountDispatch = () => {
        dispatch(pauseCount());
    }
    const handleResumeCountDispatch = () => {
        dispatch(resumeCount());
    }
    const startCount = () => {
        setInterval(handleCountUpDispatch, 1000);
    }
    const x = useSelector(selectCurNumSeconds);
    const elapseTime = `Time elapsed: ${Math.floor(x / 3600)} H ${Math.floor(x / 60)} M ${x % 60} S`;

    return (
        <div className="elapse-timer">
            <button className="button elapse-time-start" onClick={() => startCount()}
            >Start count time in seconds</button>
            <button className="button elapse-time-pause" onClick={() => handlePauseCountDispatch()}
            >Pause count time in seconds</button>
            <button className="button elapse-time-resume" onClick={() => handleResumeCountDispatch()}
            >Resume count time in seconds</button>
            <p>{elapseTime}</p>
        </div>
    );
}