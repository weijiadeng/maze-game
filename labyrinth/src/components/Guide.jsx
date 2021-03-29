import React from 'react';
import { useDispatch } from 'react-redux';
import { displayWelcome } from '../reducers/programWindowSlice';
import GameModeDescription from './GameModeDescription';
import styles from './guide.module.css'
import HelperPage from './HelperPage';
import OperationDescription from './OperationDescription';
import MiniMapEventDescription from './MiniMapEventDescription';
import DarkModeEventDescription from './DarkModeEventDescription';
import SpeedChangeEventDescription from './SpeedChangeEventDescription';
import HPChangeEventDescription from './HPChangeEventDescription';

const Guide = () => {
    const dispatch = useDispatch();
    const handleGoBack = () => {
        dispatch(displayWelcome());
    }
    const goBack = "< Go Back";

    return (
        <div className={styles.guide}>
            <span className={`${styles.goBackButton} ${styles.topGoBackButton}`} onClick={() => handleGoBack()}>{goBack}</span>

            <div>
                <h2 className={styles.bigHeader}>Welcome! You have entered a dangerous maze !</h2>
                <p className={styles.plainText}>The purpose of the game is to find the exit.</p>
                <OperationDescription />
            </div>

            <div className={styles.description}>
                <h3 className={styles.smallHeader}> Tips:</h3>
                <ul className={styles.list}>
                    <li>During your exploration, your moves might invoke different kinds of effects.
                Some of them are helpful, some of them are not. :)</li>
                    <li>Keep an eye on your HP! If your HP went to 0, you fail!</li>
                    <li>Enjoy!</li>
                    <li>Maybe you already know, but again, trying to go through the walls directly won't work!</li>
                </ul>
            </div>
            <div className={styles.description}>
                <h3 className={styles.smallHeader}>Effects you might invoke:</h3>
                <ul className={styles.list}>
                    <li>
                        <MiniMapEventDescription />
                    </li>
                    <li>
                        <DarkModeEventDescription />
                    </li>
                    <li>
                        <SpeedChangeEventDescription />
                    </li>
                    <li>
                        <HPChangeEventDescription />
                    </li>
                </ul>
            </div >
            <GameModeDescription />
            <br />
            <br />
            <br />
            <span className={styles.goBackButton} onClick={() => handleGoBack()}>{goBack}</span >
            <br />
            <br />
        </div >
    );
}

export default Guide;