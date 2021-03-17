import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { selectBuff, selectDebuff, selectHP } from '../reducers/playerStatusSlice';
import '../style/playerStatusPanel.css'

const PlayerStatusPanel = () => {
    const hp = useSelector(selectHP);
    const buffList = useSelector(selectBuff);
    const debuffList = useSelector(selectDebuff);
    return (
        <React.Fragment>
            <div className="player-status-panel">
                <div>HP: {hp}</div>
                <div>Buff: {buffList}</div>
                <div>Debuff: {debuffList}</div>
            </div>
        </React.Fragment>
    );
}

export default PlayerStatusPanel;