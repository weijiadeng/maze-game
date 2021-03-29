import React from 'react';
import miniMapIcon from '../images/mapicon.png';
import miniMap from '../images/miniMap.png';
import styles from './guide.module.css'

const MiniMapEventDescription = () => {
    return (
        <React.Fragment>
            <div className={styles.liHeaderContainer} >
                <p className={styles.liHeader}>
                    Minimap ON/OFF <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img className={styles.eventIcon} src={miniMapIcon} alt="miniMap Icon" />
                    <br />
                </p>
            </div>
            <p className={styles.eventDetail}>

                When you see this icon,
                It means the Mini Map has been shown for you. You can see the map of the maze on the top left.
                Like this:<br />
                <span><img className={`${styles.eventPicture} ${styles.mimiMapEventPicture}`} src={miniMap} alt="MiniMap" /></span>
            </p>
        </React.Fragment >
    );
}

export default MiniMapEventDescription;