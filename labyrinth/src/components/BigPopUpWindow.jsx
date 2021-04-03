import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enableBigPopUpPresense,
  selectBigPopUpPresense,
  selectBigPopUpIsToOpen,
  disableBigPopUpIsToOpen,
} from "../reducers/popUpWindowSlice";
import styles from "./bigPopUpWindow.module.css";
import Modal from "react-modal";
import { pauseCount } from "../reducers/elapseTimerSlice";
import { pauseAction } from "../reducers/controlSlice";

// Base componments for all the big pop up window in the game view.
// Will pause the game and block all input.
const BigPopUpWindow = (props) => {
  const dispatch = useDispatch();
  // isToOpen is to denote the request of openning a new popup window,
  // does not redener the pop up window immediately once the request is sent
  // to delay the render time and prevent too many rerenders.
  const isToOpen = useSelector(selectBigPopUpIsToOpen);
  useEffect(() => {
    // There are many kinds of pop up window in this game, this is to test
    // whether the requested kind is the same with the current popup window componment.
    // For example, if the popup window is used for showing helper message,
    // it should be only open when a request for openning helper message is sent.
    if (isToOpen === props.openType) {
      dispatch(enableBigPopUpPresense(props.openType));
      dispatch(pauseAction());
      dispatch(disableBigPopUpIsToOpen());
    }
  }, [isToOpen, props.openType, dispatch]);

  const isOpen = useSelector(selectBigPopUpPresense) === props.openType;
  useEffect(() => {
    if (isOpen) {
      // Pause the clock counting
      dispatch(pauseCount());
    }
  }, [isOpen, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.popup}
      overlayClassName={styles.overlay}
      // animation time
      closeTimeoutMS={300}
    >
      <img src={props.background} className={styles.backgroundPic} alt={""} />

      <div className={styles.content}>
        {props.children}
        <div className={styles.buttonsection}>{props.buttons}</div>
      </div>
    </Modal>
  );
};

export default BigPopUpWindow;
