import React from "react"
import styles from "./welcome.module.css"

export function Welcome() {
    return (
    <React.Fragment>
    <h1 className={styles.title}>Maze</h1>
    <div className={styles.options}>
        <h3 className={styles.buttons}>Game Start</h3>
        <h3 className={styles.buttons}>Guide</h3>
        <h3 className={styles.buttons}>About</h3>

    </div>
    </React.Fragment>);
}