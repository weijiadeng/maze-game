import React from 'react';
import { useSelector } from 'react-redux';
import './MiniMapStyle.css';
import {
    selectPosX,
    selectPosZ,
    selectWallTop,
    selectWallLeft,
    selectNumX,
} from '../Controls/controlSlice';



export function MiniMap(props) {
    const wallTop = useSelector(selectWallTop);
    const wallLeft = useSelector(selectWallLeft);
    const numX = useSelector(selectNumX);
    const numZ = useSelector(selectNumX);
    const posX = useSelector(selectPosX);
    const posZ = useSelector(selectPosZ);
    const display = [];
    for (let i = 0; i < numZ; i++) {
        display.push([])
        for (let j = 0; j < numX; j++) {
            display[i].push(
                <button className="square" key={String(i)+','+String(j)}
                    style={{
                        borderTop: wallTop[i * (numX + 1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                        borderLeft: wallLeft[i * (numX + 1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                        borderBottom: wallTop[(i+1) * (numX  +1) + j] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                        borderRight: wallLeft[i * (numX + 1) + j+1] ? '0.5px solid white' : '0.5px solid rgba(240, 248, 255, 0.25)',
                        backgroundColor: (posX === j && posZ === i) ? 'rgb(37, 110, 194)' : 'rgba(240, 248, 255, 0.5)'
                    }} >
                </button>
            );
        }
    }
    let ret = []
    for (let i = 0; i < numZ; i++) {
        ret.push(<div className="board-row" key={"border"+String(i)}>{display[i]}</div>)
    }

    return (
        <div>
            <div className="container">
                {ret}
            </div>
        </div>
    );
}
