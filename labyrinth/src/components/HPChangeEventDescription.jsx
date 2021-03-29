import React from 'react';
import heartIcon from '../images/heart-icon.png';
import styles from './guide.module.css'

const HPChangeEventDescription = () => {
    return (
        <React.Fragment>
            <div className={styles.liHeaderContainer} >
                <p className={styles.liHeader}>
                    <span className={styles.liHeaderText}>HP Gain/Lose</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img className={styles.eventIcon} src={heartIcon} alt="heart Icon" />
                    <br />
                </p>
            </div>
            <p className={styles.eventDetail}>
                You might also invoke some events related to the change of your HP.
                Some of them will be positive, however, some won't.
                Keep an eye on the your health during the game!
            </p>
        </React.Fragment >
    );
}

export default HPChangeEventDescription;