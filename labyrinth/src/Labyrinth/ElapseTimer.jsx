import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurNumSeconds, selectStatus, countUp, pauseCount, resumeCount, READY } from './elapseTimerSlice'

// A timer recording elapse time.
export default function ElapseTimer() {
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();
    const handleCountUpDispatch = () => {
        dispatch(countUp());
    }

    if (status === READY) {
        dispatch(resumeCount());
        setInterval(handleCountUpDispatch, 1000);
    }

    const x = useSelector(selectCurNumSeconds);
    const elapseTime = `Time elapsed: ${Math.floor(x / 3600)} H ${Math.floor(x / 60)} M ${x % 60} S`;

    return (
        <div className="elapse-timer">
            <p>{elapseTime}</p>
        </div>
    );
}
