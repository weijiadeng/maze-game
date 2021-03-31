import styles from "./navPanel.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export function NavPanel({ }) {
    return (
        <div className={styles.navPanelContainer}>
            <FontAwesomeIcon className={styles.icon} icon={faHome} />
            <FontAwesomeIcon className={styles.icon} icon={faQuestionCircle} onClick={() => { }} />
        </div>
    )
}
