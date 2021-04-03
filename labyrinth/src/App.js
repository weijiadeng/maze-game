import Modal from "react-modal";
import BackgroundMusic from "./commons/BackgroundMusic";
import Routes from "./Routes";

import "./styles.css";

Modal.setAppElement("#root");

export default function App() {
  return (
    <>
      <BackgroundMusic />
      <Routes />
    </>
  );
}
