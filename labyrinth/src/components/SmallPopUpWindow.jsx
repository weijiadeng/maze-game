import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disablePresense, enablePresense, selectPresense, selectIsToOpen, disableIsToOpen } from '../reducers/smallPopUpWindowSlice';
import styles from './smallPopUpWindow.module.css'
import Modal from "react-modal"


const SmallPopUpWindow = (props) => {
    const dispatch = useDispatch();
    const isToOpen = useSelector(selectIsToOpen)
    useEffect(() => {
        if (isToOpen) {
            dispatch(enablePresense());
            dispatch(disableIsToOpen());
        }
    });
    const handlePresenseChange = () => {
        dispatch(disablePresense());
    }

    useEffect(() => {
        setTimeout(handlePresenseChange, 2000);
    });
    const isOpen = useSelector(selectPresense);

    return (
        <Modal
            isOpen={isOpen}
            className={styles.popup}
            overlayClassName={styles.overlay}
            closeTimeoutMS={1000}>
            {/* <img src={background} className={styles.backgroundPic} alt={""} /> */}

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
