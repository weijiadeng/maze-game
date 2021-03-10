import * as React from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';
import {
  selectAction,
  selectPosX,
  selectPosZ,
  popEvent,
  selectDirection,
  MOVE_FORWARD,
  TURN_LEFT,
  TURN_RIGHT,
  NOTHING,
  UP,
  DOWN,
  LEFT,
  RIGHT
} from './controlSlice';
import { useSelector, useDispatch } from 'react-redux';


// extend THREE to include TrackballControls
extend({ TrackballControls });

export const Controls = ({
  wallTop,
  wallLeft,
  blockWidth,
  startCoordX,
  startCoordZ,
  moveSpeed,
  turnSpeed,
}) => {
  const { camera, gl } = useThree();

  const currentAction = useSelector(selectAction);
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const direction = useSelector(selectDirection);
  // Current angle is the remaining angle the camera needs to rotate
  const [currentAngle, setCurrentAngle] = React.useState(0);
  let localAngle = currentAngle;

  const coordX = (-blockWidth / 2 + posX * blockWidth + startCoordX);
  const coordZ = (-blockWidth / 2 + posZ * blockWidth + startCoordZ);

  const dispatch = useDispatch();

  useFrame(() => {
    // console.log(posX, coordX, camera.position.x)
    // update the view as the vis is interacted with
    // controls.current.update();
    switch (currentAction) {
      case MOVE_FORWARD:
        switch (direction) {
          case UP:
            if (camera.position.z > coordZ) {
              camera.position.z -= moveSpeed;
              camera.lookAt(camera.position.x, 0, coordZ - 10);
            }
            break;
          case LEFT:
            if (camera.position.x < coordX) {
              camera.position.x += moveSpeed;
              camera.lookAt(coordX + 10, 0, camera.position.z);
            }
            break;
          case DOWN:
            if (camera.position.z < coordZ) {
              camera.position.z += moveSpeed;
              camera.lookAt(camera.position.x, 0, coordZ + 10);
            }
            break;
          case RIGHT:
            if (camera.position.x > coordX) {
              camera.position.x -= moveSpeed;
              camera.lookAt(coordX - 10, 0, camera.position.z);
            }
            break;
          default:
            console.log("direction error!");
        }
        if (camera.position.x === coordX) {
          if (camera.position.z === coordZ) {
            console.log("success");
            dispatch(popEvent());
          }
        }
        break;
      case TURN_LEFT:
        if (currentAngle === 0) {
          localAngle = currentAngle + 90;
          setCurrentAngle(localAngle);
        }
        if (currentAngle > 0) {
          camera.rotateY(THREE.Math.degToRad(2));
          localAngle -= turnSpeed;
          setCurrentAngle(localAngle);
        }
        if (localAngle === 0) {
          dispatch(popEvent());
        }
        break;
      case TURN_RIGHT:
        if (currentAngle === 0) {
          setCurrentAngle(currentAngle - 90);
          localAngle = currentAngle - 90;
        }
        if (localAngle < 0) {
          camera.rotateY(THREE.Math.degToRad(-2));
          localAngle += turnSpeed;
          setCurrentAngle(localAngle);
        }
        if (localAngle === 0) {
          dispatch(popEvent());
        }
        break;
      case NOTHING:
        break;
      default:
        console.log("button error!");
    }
    camera.updateProjectionMatrix()
  });

  return (
    <trackballControls
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
    />
  );
};
