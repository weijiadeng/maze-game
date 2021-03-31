import styles from "./navPanel.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { pauseAction, resumeAction } from "../reducers/controlSlice";
import { useHistory } from "react-router";
import { stopBGM } from "../reducers/backgroundMusicSlice";
import { disableBigPopUpPresense, enableBigPopUpIsToOpen, HELPER_WINDOW } from "../reducers/popUpWindowSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import background from '../images/bigWindowBackground.png'
import HelperPage from "./HelperPage";

function HelperPageWindow() {
    const dispatch = useDispatch();
    const buttons = (<div onClick={() => {
        dispatch(disableBigPopUpPresense());
        dispatch(resumeAction());
    }}>I see!</div>);
    return (
        <BigPopUpWindow buttons={buttons} background={background} openType={HELPER_WINDOW}>
            <h1>Quick Guide</h1>
            <HelperPage />
        </BigPopUpWindow>
    );
}

export function NavPanel({ }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleGoHome = () => {
        history.push("");
        dispatch(stopBGM());
    };
    const handleHelperPage = () => {
        dispatch(pauseAction());
        dispatch(enableBigPopUpIsToOpen(HELPER_WINDOW));
    }
    return (
        <>
            <HelperPageWindow />
            <div className={styles.navPanelContainer}>
                <FontAwesomeIcon className={styles.icon} icon={faHome} onClick={() => { handleGoHome(); }} />
                <FontAwesomeIcon className={styles.icon} icon={faQuestionCircle} onClick={() => { handleHelperPage(); }} />
            </div>
        </>
    )
}
