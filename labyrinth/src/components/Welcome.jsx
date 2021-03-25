import React from "react"
import { useDispatch } from "react-redux";
import { displayModeSelection, displayGuide } from '../reducers/programWindowSlice';
import styles from "./welcome.module.css"


export function WelcomeScreens(props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Maze</h1>
            {props.children}
        </div>);
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
