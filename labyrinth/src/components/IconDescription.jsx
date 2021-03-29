import React from 'react';
import speedUpIcon from '../images/rocket.png';
import speedDownIcon from '../images/turtleicon.png';
import miniMapIcon from '../images/mapicon.png';
import heartIcon from '../images/heart-icon.png';
import darkModeIcon from '../images/night.png';
import brightModeIcon from '../images/sun.png';
import normalClock from '../images/normalclock.png';
import outOfTimeClock from '../images/outoftimeclock.png';
import styles from './helperPage.module.css'

const IconDescription = () => {
    return (
        <div className={styles.iconDescriptionContainer}>
            <div className={styles.twoIconContainer}>
                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={heartIcon} alt="heart Icon" />
                    HP
                </p>
                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={normalClock} alt="normal clock Icon" />
                    Clock
                </p>
            </div>
            <div className={styles.twoIconContainer}>

                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={outOfTimeClock} alt="out of time clock Icon" />
                    Clock when time is almost up
                </p>
                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={miniMapIcon} alt="mini map Icon" />
                    Mini Map
                </p>
            </div>

            <div className={styles.twoIconContainer}>

                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={darkModeIcon} alt="dark mode Icon" />
                    Dark Mode
                </p>
                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={brightModeIcon} alt="bright mode Icon" />
                    Bright Mode
                </p>
            </div>
            <div className={styles.twoIconContainer}>

                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={speedUpIcon} alt="speed up Icon" />
                    Speed Up
                </p>
                <p className={styles.plainText}>
                    <img className={styles.eventIcon} src={speedDownIcon} alt="speed down Icon" />
                    Speed Down
                </p>
            </div>

        </div >
    );
}

export default IconDescription;