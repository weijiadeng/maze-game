import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurNumSeconds, selectStatus, countUp, resumeCount, READY, selectIntervalHasSet, markIntervalSet } from '../reducers/elapseTimerSlice'

// A timer recording elapse time.
export default function ElapseTimer() {
    const status = useSelector(selectStatus);
    const intervalHasSet = useSelector(selectIntervalHasSet);
    const dispatch = useDispatch();
    const handleCountUpDispatch = () => {
        dispatch(countUp());
    }

    if (status === READY) {
        dispatch(resumeCount());
        if (!intervalHasSet) {
            setInterval(handleCountUpDispatch, 1000);
            dispatch(markIntervalSet());
        }
    }

    // const x = useSelector(selectCurNumSeconds);
    // const elapseTime = `Time elapsed: ${Math.floor(x / 3600)} H ${Math.floor(x / 60)} M ${x % 60} S`;

    return (
        <></>
    );
}
