import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disablePresense, enablePresense } from '../reducers/smallPopUpWindowSlice';
import '../style/smallPopUpWindow.css'

const SmallPopUpWindow = (props) => {
    const dispatch = useDispatch();
    const resetPresenseToTrue = () => {
        dispatch(enablePresense());
    }

    const handlePresenseChange = () => {
        dispatch(disablePresense());
        setTimeout(resetPresenseToTrue, 1000)
    }

    useEffect(() => {
        setTimeout(handlePresenseChange, 2000);
    });
    return (
        <div className="small-popup-window">
            {props.content}
        </div>
    );
}

export default SmallPopUpWindow;