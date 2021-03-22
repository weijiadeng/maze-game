import LabyrinthGame from './components/LabyrinthGame';
import './styles.css';
import { useSelector } from 'react-redux';
import { selectWindow, WELCOME, GAME, MODE_SELECTION, GUIDE } from './reducers/programWindowSlice';
import { ModeSelection, Welcome } from './components/Welcome';
import Modal from "react-modal"
import Guide from './components/Guide';

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
    case GUIDE:
      toRender = <Guide />
      break;
    default:
      console.log("Window mode error:" + currentWindow);
  }
  return toRender;
}
