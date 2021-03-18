import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disablePresense, enablePresense, selectPresense } from '../reducers/smallPopUpWindowSlice';
import styles from './smallPopUpWindow.module.css'
import Modal from "react-modal"
import background from './scroll.png'
import { pauseCount, resumeCount } from '../Labyrinth/elapseTimerSlice';
import { occurEvent, popEvent } from '../Labyrinth/Controls/controlSlice';

Modal.setAppElement('#root')

const SmallPopUpWindow = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isToOpen) {
            dispatch(enablePresense());
            dispatch(occurEvent());
        }
    });
    
    const isOpen = useSelector(selectPresense);
    useEffect(() => {
        if (isOpen) {
            dispatch(pauseCount());
        }
    });
    const handlePresenseChange = () => {
        dispatch(disablePresense());
        dispatch(resumeCount());
        dispatch(popEvent());
        //setTimeout(resetPresenseToTrue, 1000)
    }

    return (
        <Modal
            isOpen={isOpen}
            className={styles.popup}
            overlayClassName={styles.overlay}
            closeTimeoutMS={1000}>
            <img src={background} className={styles.backgroundPic} alt={""} />
            <div className={styles.content}>
                {props.children}
                <div className={styles.button} onClick={() => { handlePresenseChange() }}>Emm...Interesting</div>
            </div>
        </Modal>
    );
}

export default SmallPopUpWindow;
