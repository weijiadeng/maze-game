import React from "react"
import { useDispatch } from "react-redux";
import { displayGame, displayWelcome } from '../reducers/programWindowSlice';
import { PURE, EASY, HARD, MEDIUM, setGameMode } from "../reducers/gameModeSlice";
import styles from "./welcome.module.css"
import { WelcomeScreens } from "./Welcome";
import Footer from "./Footer";


export function ModeSelection() {
    const dispatch = useDispatch();

    const handleModeSelect = (mode) => {
        dispatch(setGameMode(mode));
        dispatch(displayGame());
    }

    const handleGoBack = () => {
        dispatch(displayWelcome());
    }

    return (
        <WelcomeScreens>
            <div className={styles.options}>
                <h3 className={styles.buttons} onClick={() => handleModeSelect(EASY)}>Easy</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect(MEDIUM)}>Medium</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect(HARD)}>Hard</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect(PURE)}>Pure Maze</h3>
                <h3 className={styles.buttons} onClick={() => handleGoBack()}>Go Back</h3>
            </div>
            <div className={styles.footnote}></div>
            <Footer />
        </WelcomeScreens>
    );
}
