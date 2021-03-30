import React from "react"
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import styles from "./welcome.module.css"
import { NavLink, useLocation } from 'react-router-dom';


export function WelcomeScreens(props) {
    console.log(useLocation());
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
