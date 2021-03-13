import { useEffect, useState } from "react";
import { NOTHING, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../Controls/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { pauseCount, readyCount } from '../elapseTimerSlice'


function StartEventRender() {
    // Popup window currently not working
    return (<div></div>);
}

function startEventCallback(dispatch) {
    alert("Game Start!");
    dispatch(readyCount());
}

function EndEventRender() {
    return (<div></div>);
}

function endEventCallback(dispatch) {
    dispatch(pauseCount());
    alert("Congrats! You've passed the game!");
}



function initEventMap(numX, numZ) {
    const eventMap = Array(numX * numZ).fill(null);
    eventMap[numX * (numZ - 1) + numX - 1] = [StartEventRender, startEventCallback];
    eventMap[0] = [EndEventRender, endEventCallback];
    return eventMap;
}

export function EventManager({ discovered }) {
    const numX = useSelector(selectNumX);
    const numZ = useSelector(selectNumZ);
    const [eventMap,] = useState(initEventMap(numX, numZ));
    const posX = useSelector(selectPosX);
    const posZ = useSelector(selectPosZ);
    const currentIndex = posZ * numX + posX;
    const currentAction = useSelector(selectAction);
    const dispatch = useDispatch();
    let currentCallback = () => { };
    let toRender = () => { };
    if (currentAction === NOTHING) {
        if (!discovered.current[currentIndex]) {
            if (eventMap[currentIndex] !== null) {
                toRender = () => { eventMap[currentIndex][0]() };
                currentCallback = () => { eventMap[currentIndex][1](dispatch) };
                console.log("Triggered");
            }
        }
    }
    useEffect(currentCallback);

    return (<div>{toRender()}</div>);
}
