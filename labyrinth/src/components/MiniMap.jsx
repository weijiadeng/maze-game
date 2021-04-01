import React from "react";
import styles from "./miniMap.module.css";

export function MiniMap({
  discovered,
  numX,
  numZ,
  posX,
  posZ,
  wallLeft,
  wallTop,
  miniMapIsOn,
}) {
  const display = [];
  for (let i = 0; i < numZ; i++) {
    let currentRow = [];
    for (let j = 0; j < numX; j++) {
      if (discovered.current[i * numX + j] || (posX === j && posZ === i)) {
        currentRow.push(
          <div
            className={styles.square}
            key={String(i) + "," + String(j)}
            style={{
              borderTop: wallTop[i * (numX + 1) + j]
                ? "0.5px solid white"
                : "0.5px solid rgba(240, 248, 255, 0.25)",
              borderLeft: wallLeft[i * (numX + 1) + j]
                ? "0.5px solid white"
                : "0.5px solid rgba(240, 248, 255, 0.25)",
              borderBottom: wallTop[(i + 1) * (numX + 1) + j]
                ? "0.5px solid white"
                : "0.5px solid rgba(240, 248, 255, 0.25)",
              borderRight: wallLeft[i * (numX + 1) + j + 1]
                ? "0.5px solid white"
                : "0.5px solid rgba(240, 248, 255, 0.25)",
              backgroundColor:
                posX === j && posZ === i
                  ? "rgb(37, 110, 194)"
                  : "rgba(240, 248, 255, 0.5)",
            }}
          ></div>
        );
      } else {
        currentRow.push(
          <div
            className={styles.square}
            key={String(i) + "," + String(j)}
            style={{
              borderTop: "0.5px solid rgba(0, 0, 0, 0.1)",
              borderLeft: "0.5px solid rgba(0, 0, 0, 0.1)",
              borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
              borderRight: "0.5px solid rgba(0, 0, 0, 0.1)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          ></div>
        );
      }
    }
    display.push(
      <div className={styles.broadRow} key={"border" + String(i)}>
        {currentRow}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.map}>{miniMapIsOn ? display : null}</div>
    </div>
  );
}
