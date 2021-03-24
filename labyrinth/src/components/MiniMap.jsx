import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectPosX,
    selectPosZ,
    selectWallTop,
    selectWallLeft,
    selectNumX,
    selectAction,
    NOTHING,
} from '../reducers/controlSlice';
import {
    selectBuff,
    MINI_MAP_ON,
} from '../reducers/playerStatusSlice';
import styles from './miniMap.module.css';



export function MiniMap({ discovered }) {
    const wallTop = useSelector(selectWallTop);
    const wallLeft = useSelector(selectWallLeft);
    const numX = useSelector(selectNumX);
    const numZ = useSelector(selectNumX);
    const posX = useSelector(selectPosX);
    const posZ = useSelector(selectPosZ);
    const showMiniMap = (useSelector(selectBuff) & MINI_MAP_ON);
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
                    <button className={styles.square} key={String(i) + ',' + String(j)}
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
                    <button className={styles.square} key={String(i) + ',' + String(j)}
                        style={{
                            border: '0.5px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                        }} >
                    </button>);

            }
        }
        display.push(<div className={styles.broadRow} key={"border" + String(i)}>{currentRow}</div>)
    }

    return (
        <div className={styles.container}>
            <div></div>
            <div className={styles.map}>
                {showMiniMap ? display : null}
            </div>
        </div>
    );
}
