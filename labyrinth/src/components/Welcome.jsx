import React from "react"
import { useDispatch } from "react-redux";
import styles from "./welcome.module.css"
import { displayGame, displayModeSelection, displayWelcome, displayGuide } from '../reducers/programWindowSlice';
import { CUSTOM, EASY, HARD, MEDIUM, setGameMode } from "../reducers/gameModeSlice";

function WelcomeScreens(props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Maze</h1>
            {props.children}
        </div>);
}

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
                <h3 className={styles.buttons} onClick={() => handleModeSelect(CUSTOM)}>Custom</h3>
                <h3 className={styles.buttons} onClick={() => handleGoBack()}>Go Back</h3>
            </div>
            <div className={styles.footnote}></div>
        </WelcomeScreens>
    );
}

export function Welcome() {
    const dispatch = useDispatch();

    const handleGameStart = () => {
        dispatch(displayModeSelection());
    }

    const handleGuide = () => {
        dispatch(displayGuide());
    }

    return (
        <WelcomeScreens>
            <div className={styles.options}>
                <h3 className={styles.buttons} onClick={() => handleGameStart()}>Game Start</h3>
                <h3 className={styles.buttons} onClick={() => handleGuide()}>Guide</h3>
                <h3 className={styles.buttons}>About</h3>
            </div>
        </ WelcomeScreens>);
}
