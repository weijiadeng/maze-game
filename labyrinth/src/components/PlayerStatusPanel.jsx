import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { selectBuff, selectDebuff, selectHP } from '../reducers/playerStatusSlice';
import styles from './playerStatusPanel.module.css'

const PlayerStatusPanel = () => {
    const hp = useSelector(selectHP);
    const buffList = useSelector(selectBuff).join(' ,');
    const debuffList = useSelector(selectDebuff).join(' ,');
    return (
        <React.Fragment>
            <div className={styles.playerStatusPanel}>
                <div>HP: {hp}</div>
                <div>Buff: {buffList}</div>
                <div>Debuff: {debuffList}</div>
            </div>
        </React.Fragment>
    );
}

export default PlayerStatusPanel;
