import { useEffect, useState } from "react";
import { NOTHING, selectAction, selectNumX, selectNumZ, selectPosX, selectPosZ } from "../Controls/controlSlice";
import { useSelector, useDispatch } from 'react-redux';
import { pauseCount, readyCount } from '../elapseTimerSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'


function StartEventRender() {
    // Popup window currently not working
    return (<div></div>);
}

function startEventCallback(dispatch) {
    alert("Game Start!");
    dispatch(readyCount());
}

function EndEventRender() {
    return (<div></div>);
}

function endEventCallback(dispatch) {
    dispatch(pauseCount());
    alert("Congrats! You've passed the game!");
}



function initEventMap(numX, numZ) {
    const eventMap = Array(numX * numZ).fill(null);
    eventMap[numX * (numZ - 1) + numX - 1] = [StartEventRender, startEventCallback];
    eventMap[0] = [EndEventRender, endEventCallback];
    return eventMap;
}


function Example() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}


export function EventManager({ discovered }) {
    const numX = useSelector(selectNumX);
    const numZ = useSelector(selectNumZ);
    const [eventMap,] = useState(initEventMap(numX, numZ));
    const posX = useSelector(selectPosX);
    const posZ = useSelector(selectPosZ);
    const currentIndex = posZ * numX + posX;
    const currentAction = useSelector(selectAction);
    const dispatch = useDispatch();
    let currentCallback = () => { };
    let toRender = () => { };
    if (currentAction === NOTHING) {
        if (!discovered.current[currentIndex]) {
            if (eventMap[currentIndex] !== null) {
                toRender = () => { eventMap[currentIndex][0]() };
                currentCallback = () => { eventMap[currentIndex][1](dispatch) };
                console.log("Triggered");
            }
        }
    }
    useEffect(currentCallback);

    return <Example />;
}
