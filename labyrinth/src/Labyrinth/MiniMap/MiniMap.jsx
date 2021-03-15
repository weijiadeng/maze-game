import React from 'react';
import { useSelector } from 'react-redux';
import './MiniMapStyle.css';
import {
    selectPosX,
    selectPosZ,
    selectWallTop,
    selectWallLeft,
    selectNumX,
    selectAction,
    NOTHING,
} from '../Controls/controlSlice';
import { selectShowMiniMap } from '../GameStatus/gameStatusSlice';



export function MiniMap({ discovered }) {
    const wallTop = useSelector(selectWallTop);
    const wallLeft = useSelector(selectWallLeft);
    const numX = useSelector(selectNumX);
    const numZ = useSelector(selectNumX);
    const posX = useSelector(selectPosX);
    const posZ = useSelector(selectPosZ);
    const showMiniMap = useSelector(selectShowMiniMap);
    const display = [];
    const currentAction = useSelector(selectAction);
    if (currentAction === NOTHING) {
        discovered.current[posZ * numX + posX] = true;
    }
    for (let i = 0; i < numZ; i++) {
        let currentRow = [];
        for (let j = 0; j < numX; j++) {
            if (discovered.current[i * numX + j] || (posX === j && posZ === i)) {
                currentRow.push(
                    <button className="square" key={String(i) + ',' + String(j)}
                        style={{
                            borderTop: wallTop[i * (numX + 1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                            borderLeft: wallLeft[i * (numX + 1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                            borderBottom: wallTop[(i + 1) * (numX + 1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                            borderRight: wallLeft[i * (numX + 1) + j + 1] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                            backgroundColor: (posX === j && posZ === i) ? 'rgb(37, 110, 194)' : 'rgba(240, 248, 255, 0.5)'
                        }} >
                    </button>
                );
            }
            else {
                currentRow.push(
                    <button className="square" key={String(i) + ',' + String(j)}
                        style={{
                            border: '0.5px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                        }} >
                    </button>);

            }
        }
        display.push(<div className="board-row" key={"border" + String(i)}>{currentRow}</div>)
    }

    return (
        <div>
            <div className="container">
            {showMiniMap ? display:null}
            </div>
        </div>
    );
}
