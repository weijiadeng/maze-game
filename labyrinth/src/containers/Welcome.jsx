import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import styles from "./welcome.module.css"
import { NavLink } from 'react-router-dom';
import { PLAYING, selectIsPlaying, stopBGM } from "../reducers/backgroundMusicSlice";


export function WelcomeScreens(props) {
    const disptach = useDispatch();
    const isPlayBGM = useSelector(selectIsPlaying);
    useEffect(() => {
        if (isPlayBGM === PLAYING) {
            disptach(stopBGM());
        }

    });
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Maze</h1>
            {props.children}
            <Footer />
        </div>);
}

export function Welcome() {
    return (
        <WelcomeScreens>
            <div className={styles.options}>
                <NavLink to="/game" className={styles.buttons}>Game Start</NavLink>
                <NavLink to="/guide" className={styles.buttons}>Guide</NavLink>
                <NavLink to="/about" className={styles.buttons}>About</NavLink>
            </div>
        </ WelcomeScreens>);
}
