import React from 'react';
import movesGuide from '../images/movesGuide.png';
import GameModeDescription from './GameModeDescription';
import styles from './guide.module.css'
const Guide = () => {
    return (
        <div className={styles.guide}>
            <div>
                <h2 className={styles.bigHeader}>Welcome! You have entered a dangerous maze!</h2>
                <p className={styles.plainText}>The purpose of the game is to find the exit.</p>
                <p className={styles.plainText}>Use "W", "A", "S", "D" to move forward, left, backward, right.</p>
                <img className={styles.transparent} src={movesGuide} />
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
                    <li>Minimap ON/OFF
                        {/* <img /> */}
                    </li>
                    <li>
                        Dark mode ON/OFF
                    </li>
                    <li>
                        Speed UP/DOWN
                    </li>
                    <li>
                        HP points GAIN/LOSE
                    </li>
                </ul>
            </div >
            <GameModeDescription />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div >
    );
}

export default Guide;