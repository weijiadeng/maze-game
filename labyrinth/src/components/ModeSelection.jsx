import React from "react"
import { useDispatch } from "react-redux";
import styles from "./welcome.module.css"
import { WelcomeScreens } from "./Welcome";
import { assignInit } from "../reducers/controlSlice";
import { NavLink, useHistory } from 'react-router-dom';


export function ModeSelection(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleModeSelect = (mode) => {
        dispatch(assignInit(false));
        history.push('/game/'+ mode);
    }

    return (
        <WelcomeScreens>
            <div className={styles.options}>
                <h3 className={styles.buttons} onClick={() => handleModeSelect("easy")}>Easy</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect("medium")}>Medium</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect("hard")}>Hard</h3>
                <h3 className={styles.buttons} onClick={() => handleModeSelect("pure")}>Pure Maze</h3>
                <NavLink to="/" className={styles.buttons}>Go back</NavLink>
            </div>
        </WelcomeScreens>
    );
}
