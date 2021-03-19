import { useRef } from 'react';
import { GamePanel } from './components/GamePanel';
import ElapseTimer from './components/ElapseTimer';
import LabyrinthGame from './components/LabyrinthGame';
import { EventManager } from './components/EventManager';
import { MiniMap } from './components/MiniMap'
import BackgroundMusic from './commons/BackgroundMusic'
import EffectSoundTestContainer from './commons/SoundHooks';
import PlayerStatusPanel from './components/PlayerStatusPanel';
import TestPlayerStatusPanel from './exampleComponents/TestPlayerStatusPanel';
import './styles.css';
import { useSelector } from 'react-redux';
import { selectWindow, WELCOME, GAME, MODE_SELECTION } from './reducers/programWindowSlice';
import { ModeSelection, Welcome } from './components/Welcome';
import Modal from "react-modal"

Modal.setAppElement('#root')

export default function App() {
  let toRender = null;
  const currentWindow = useSelector(selectWindow);
  console.log(currentWindow);
  switch (currentWindow) {
    case WELCOME:
      toRender = <Welcome />
      break;
    case MODE_SELECTION:
      toRender = <ModeSelection />
      break;
    case GAME:
      toRender = <LabyrinthGame />
      break;
    default:
      console.log("Window mode error:" + currentWindow);
  }
  return toRender;
}
