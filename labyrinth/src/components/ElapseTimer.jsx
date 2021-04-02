import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStatus,
  countUp,
  resumeCount,
  READY,
  selectIntervalHasSet,
  markIntervalSet,
  selectCurNumSeconds,
} from "../reducers/elapseTimerSlice";
import styles from "./elapseTimer.module.css";

// A timer recording elapse time.
export default function ElapseTimer({ mode }) {
  const status = useSelector(selectStatus);
  const intervalHasSet = useSelector(selectIntervalHasSet);
  const dispatch = useDispatch();
  const handleCountUpDispatch = () => {
    dispatch(countUp());
  };

  if (status === READY) {
    dispatch(resumeCount());
    if (!intervalHasSet) {
      setInterval(handleCountUpDispatch, 1000);
      dispatch(markIntervalSet());
    }
  }

  const x = useSelector(selectCurNumSeconds);
  return mode === "pure" ? (
    <div className={styles.timer}>
      Time elapsed:{" "}
      <span className={styles.number}>{Math.floor(x / 3600)}</span> H{" "}
      <span className={styles.number}>{Math.floor(x / 60)} </span> M{" "}
      <span className={styles.number}>{x % 60} </span> S{" "}
    </div>
  ) : (
    <></>
  );
}
