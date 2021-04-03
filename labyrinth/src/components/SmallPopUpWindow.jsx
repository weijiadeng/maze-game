import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  disableSmallPopUpPresense,
  enableSmallPopUpPresense,
  selectSmallPopUpPresense,
  selectSmallPopUpIsToOpen,
  disableSmallPopUpIsToOpen,
} from "../reducers/popUpWindowSlice";
import styles from "./smallPopUpWindow.module.css";

// Base componments for all the random event window in the game view.
// Won't pause the gameview. Will auto-disappear after 2000ms.
const SmallPopUpWindow = (props) => {
  const dispatch = useDispatch();
  const isToOpen = useSelector(selectSmallPopUpIsToOpen);
  useEffect(() => {
    if (isToOpen) {
      dispatch(enableSmallPopUpPresense());
      dispatch(disableSmallPopUpIsToOpen());
    }
  });
  const handlePresenseChange = () => {
    dispatch(disableSmallPopUpPresense());
  };

  useEffect(() => {
    setTimeout(handlePresenseChange, 2000);
  });
  const isOpen = useSelector(selectSmallPopUpPresense);

  return (
    isOpen && (
      <div className={styles.content}>
        {props.children}
        <div className={styles.buttonsection}>{props.buttons}</div>
      </div>
    )
  );
};

export default SmallPopUpWindow;
