import styles from "./navPanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faQuestionCircle,
  faVolumeMute,
  faVolumeUp,
  faSun,
  faMoon,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { resumeAction } from "../reducers/controlSlice";
import { useHistory } from "react-router";
import {
  muteBGM,
  MUTED,
  selectIsPlaying,
  stopBGM,
  TO_MUTE,
  unmuteBGM,
} from "../reducers/backgroundMusicSlice";
import {
  CONFIRM_WINDOW,
  disableBigPopUpPresense,
  enableBigPopUpIsToOpen,
  HELPER_WINDOW,
} from "../reducers/popUpWindowSlice";
import BigPopUpWindow from "./BigPopUpWindow";
import background from "../images/bigWindowBackground.png";
import HelperPage from "./HelperPage";
import {
  addABuff,
  addADebuff,
  DARK_MODE_OFF,
  DARK_MODE_ON,
  MINI_MAP_OFF,
  MINI_MAP_ON,
  removeABuff,
  removeADebuff,
  selectBuff,
} from "../reducers/playerStatusSlice";

function HelperPageWindow() {
  const dispatch = useDispatch();
  const buttons = (
    <div
      onClick={() => {
        dispatch(disableBigPopUpPresense());
        dispatch(resumeAction());
      }}
    >
      I see!
    </div>
  );
  return (
    <BigPopUpWindow
      buttons={buttons}
      background={background}
      openType={HELPER_WINDOW}
    >
      <HelperPage />
    </BigPopUpWindow>
  );
}

function GobackConfirm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const buttons = (
    <>
      <div
        onClick={() => {
          dispatch(stopBGM());
          dispatch(disableBigPopUpPresense());
          dispatch(resumeAction());
          history.push("");
        }}
      >
        Yes
      </div>
      <div
        onClick={() => {
          dispatch(disableBigPopUpPresense());
          dispatch(resumeAction());
        }}
      >
        No
      </div>
    </>
  );
  return (
    <BigPopUpWindow
      buttons={buttons}
      background={background}
      openType={CONFIRM_WINDOW}
    >
      <h1>Are you sure?</h1>
      <div>
        You are going back to the welcome page, all your current game progess
        will be lost, are you sure?
      </div>
    </BigPopUpWindow>
  );
}

export function NavPanel({ mode }) {
  const isPlayingBGM = useSelector(selectIsPlaying);
  const dispatch = useDispatch();
  const handleGoHome = () => {
    dispatch(enableBigPopUpIsToOpen(CONFIRM_WINDOW));
  };
  const handleHelperPage = () => {
    dispatch(enableBigPopUpIsToOpen(HELPER_WINDOW));
  };
  const handleMute = () => {
    if (isPlayingBGM === MUTED || isPlayingBGM === TO_MUTE) {
      dispatch(unmuteBGM());
    } else {
      dispatch(muteBGM());
    }
  };
  const buff = useSelector(selectBuff);
  const handleSwitchDayNight = () => {
    if (buff & DARK_MODE_OFF) {
      dispatch(removeABuff(DARK_MODE_OFF));
      dispatch(addADebuff(DARK_MODE_ON));
    } else {
      dispatch(addABuff(DARK_MODE_OFF));
      dispatch(removeADebuff(DARK_MODE_ON));
    }
  };
  const handleSwitchMinimap = () => {
    if (buff & MINI_MAP_ON) {
      dispatch(removeABuff(MINI_MAP_ON));
      dispatch(addADebuff(MINI_MAP_OFF));
    } else {
      dispatch(addABuff(MINI_MAP_ON));
      dispatch(removeADebuff(MINI_MAP_OFF));
    }
  };
  return (
    <>
      <HelperPageWindow />
      <GobackConfirm />
      <div className={styles.navPanelContainer}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faHome}
          onClick={() => {
            handleGoHome();
          }}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faQuestionCircle}
          onClick={() => {
            handleHelperPage();
          }}
        />

        <span className={styles.toggle}>
          {mode === "pure" ? (
            <FontAwesomeIcon
              className={styles.icon}
              icon={buff & DARK_MODE_OFF ? faMoon : faSun}
              onClick={() => {
                handleSwitchDayNight();
              }}
            />
          ) : (
            <></>
          )}
          {mode === "pure" ? (
            <FontAwesomeIcon
              className={styles.icon}
              icon={faMap}
              onClick={() => {
                handleSwitchMinimap();
              }}
            />
          ) : (
            <></>
          )}
          <FontAwesomeIcon
            className={styles.icon}
            icon={
              isPlayingBGM === MUTED || isPlayingBGM === TO_MUTE
                ? faVolumeMute
                : faVolumeUp
            }
            onClick={() => {
              handleMute();
            }}
          />
        </span>
      </div>
    </>
  );
}
