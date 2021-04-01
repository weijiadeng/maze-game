import React from "react";
import { useSelector } from "react-redux";
import { selectList } from "../reducers/leaderboardSlice";
import styles from "./leaderboard.module.css";

export function LeaderboardRow({ time, index }) {
  return (
    <div className={styles.leaderRow}>
      <span className={styles.order}>{index + 1}.</span>
      <span key={index} className={styles.entry}>
        {Math.floor(time / 3600)} H {Math.floor(time / 60)} M {time % 60} S
      </span>
    </div>
  );
}

export function LearderboardSection(props) {
  const leaderList = useSelector(selectList);
  return (
    <React.Fragment>
      <h1>Leaderboard</h1>
      <div className={styles.leaderSection}>
        {leaderList.map((x, index) => (
          <LeaderboardRow key={index} index={index} time={x} />
        ))}
      </div>
    </React.Fragment>
  );
}
