import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableSmallPopUpPresense, enableSmallPopUpPresense, selectSmallPopUpPresense, selectSmallPopUpIsToOpen, disableSmallPopUpIsToOpen } from '../reducers/popUpWindowSlice';
import styles from './smallPopUpWindow.module.css'
import Modal from "react-modal"


const SmallPopUpWindow = (props) => {
    const dispatch = useDispatch();
    const isToOpen = useSelector(selectSmallPopUpIsToOpen)
    useEffect(() => {
        if (isToOpen) {
            dispatch(enableSmallPopUpPresense());
            dispatch(disableSmallPopUpIsToOpen());
        }
    });
    const handlePresenseChange = () => {
        dispatch(disableSmallPopUpPresense());
    }

    useEffect(() => {
        setTimeout(handlePresenseChange, 2000);
    });
    const isOpen = useSelector(selectSmallPopUpPresense);

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
