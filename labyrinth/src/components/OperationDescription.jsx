import React from 'react';
import movesGuide from '../images/movesGuide.png';
import styles from './guide.module.css'


const OperationDescription = () => {
    return (
        <div>
            <p className={styles.plainText}>Use "W", "A", "S", "D" to move forward, left, backward, right.</p>
            <img className={styles.moveGuide} src={movesGuide} alt="move guide" />
        </div>
    );
}

export default OperationDescription;
