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

const BigPopUpWindow = (props) => {
  const dispatch = useDispatch();
  const isToOpen = useSelector(selectBigPopUpIsToOpen);
  useEffect(() => {
    if (isToOpen === props.openType) {
      dispatch(enableBigPopUpPresense(props.openType));
      dispatch(pauseAction());
      dispatch(disableBigPopUpIsToOpen());
    }
  }, [isToOpen, props.openType, dispatch]);

  const isOpen = useSelector(selectBigPopUpPresense) === props.openType;
  useEffect(() => {
    if (isOpen) {
      dispatch(pauseCount());
    }
  }, [isOpen, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      className={styles.popup}
      overlayClassName={styles.overlay}
      closeTimeoutMS={500}
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
