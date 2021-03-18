import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disablePresense, enablePresense, selectPresense, selectIsToOpen, disableIsToOpen } from '../reducers/smallPopUpWindowSlice';
import styles from './smallPopUpWindow.module.css'
import Modal from "react-modal"
import background from './scroll.png'
import { pauseCount, resumeCount } from '../Labyrinth/elapseTimerSlice';
import { occurEvent, popEvent } from '../Labyrinth/Controls/controlSlice';

Modal.setAppElement('#root')

const SmallPopUpWindow = (props) => {
    const dispatch = useDispatch();
    const isToOpen = useSelector(selectIsToOpen)
    useEffect(() => {
        if (isToOpen) {
            dispatch(enablePresense());
            dispatch(occurEvent());
            dispatch(disableIsToOpen());
        }
    });

    const isOpen = useSelector(selectPresense);
    useEffect(() => {
        if (isOpen) {
            dispatch(pauseCount());
        }
    });

    return (
        <Modal
            isOpen={isOpen}
            className={styles.popup}
            overlayClassName={styles.overlay}
            closeTimeoutMS={1000}>
            <img src={background} className={styles.backgroundPic} alt={""} />
            <div className={styles.content}>
                {props.children}
                <div className={styles.buttonsection}>
                    {props.buttons}
                </div>
            </div>
        </Modal>
    );
}

export default SmallPopUpWindow;
