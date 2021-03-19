import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { addABuff, addADebuff, decreaseHP, increaseHP, resetBuffAndDebuff } from '../reducers/playerStatusSlice';

const TestPlayerStatusPanel = () => {
    const dispatch = useDispatch();
    const handleIncreaseHPByTen = () => {
        dispatch(increaseHP(10));
    }
    const handleDecreaseHPByTen = () => {
        dispatch(decreaseHP(10));
    }
    const handleAddSpeedUpBuff = () => {
        dispatch(addABuff("SPEED_UP"));
    }
    const handleAddSpeedDownDebuff = () => {
        dispatch(addADebuff('SPEED_DOWN'));
    }
    const handleClearAllEffects = () => {
        dispatch(resetBuffAndDebuff());
    }
    return (
        <div>
            <button onClick={handleIncreaseHPByTen}>Add HP by 10</button>
            <button onClick={handleDecreaseHPByTen}>Reduce HP by 10</button>
            <button onClick={handleAddSpeedUpBuff}>Add a Speed Up buff</button>
            <button onClick={handleAddSpeedDownDebuff}>Add a Speed Down debuff</button>
            <button onClick={handleClearAllEffects}>Clear all buff and debuff</button>
        </div>
    );
}

export default TestPlayerStatusPanel;