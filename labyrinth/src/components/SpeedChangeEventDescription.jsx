import React from 'react';
import speedUpIcon from '../images/rocket.png';
import speedDownIcon from '../images/turtleicon.png';
import styles from '../containers/guide.module.css';

const SpeedChangeEventDescription = () => {
    return (
        <React.Fragment>
            <div className={styles.liHeaderContainer} >
                <p className={styles.liHeader}>
                    <span className={styles.liHeaderText}> Speed Up/Down ON/OFF </span> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img className={styles.eventIcon} src={speedUpIcon} alt="speed up Icon" />
                    <img className={styles.eventIcon} src={speedDownIcon} alt="speed down Icon" />
                    <br />
                </p>
            </div>
            <p className={styles.eventDetail}>

                When you see these icon,
                It means the some change have been applied to your moving speed.
                These effects will immediately apply.
            </p>
        </React.Fragment >
    );
}

export default SpeedChangeEventDescription;