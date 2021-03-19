import React from "react"
import { useDispatch } from "react-redux";
import styles from "./welcome.module.css"
import { displayGame, displayModeSelection, displayWelcome } from '../reducers/programWindowSlice';

export function ModeSelection() {
    const dispatch = useDispatch();

    const handleModeSelect = ()=> {
        dispatch(displayGame());
    }

    const handleGoBack = ()=> {
        dispatch(displayWelcome());
    }

    return (
        <React.Fragment>
            <h1 className={styles.title}>Maze</h1>
            <div className={styles.options}>
                <h3 className={styles.buttons} onClick={()=>handleModeSelect()}>Easy</h3>
                <h3 className={styles.buttons} onClick={()=>handleModeSelect()}>Medium</h3>
                <h3 className={styles.buttons} onClick={()=>handleModeSelect()}>Hard</h3>
                <h3 className={styles.buttons} onClick={()=>handleModeSelect()}>Custom</h3>
                <h3 className={styles.buttons} onClick={()=>handleGoBack()}>Go Back</h3>
            </div>
        </React.Fragment>);
}

export function Welcome() {
    const dispatch = useDispatch();

    const handleGameStart = ()=> {
        dispatch(displayModeSelection());
    }

    return (
        <React.Fragment>
            <h1 className={styles.title}>Maze</h1>
            <div className={styles.options}>
                <h3 className={styles.buttons} onClick={()=>handleGameStart()}>Game Start</h3>
                <h3 className={styles.buttons}>Guide</h3>
                <h3 className={styles.buttons}>About</h3>
            </div>
        </React.Fragment>);
}
