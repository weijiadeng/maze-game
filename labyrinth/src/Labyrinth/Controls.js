import * as React from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

// extend THREE to include TrackballControls
extend({ TrackballControls });

// key code constants
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

const Controls = (setPosFunc, ref) => {
  const controls = React.useRef();
  const { camera, gl } = useThree();

  const [targetX, setTargetX] = React.useState(190);
  const [targetZ, setTargetZ] = React.useState(189);
  const [targetDirection, setDirection] = React.useState(0);
  const [currentAngle, setCurrentAngle] = React.useState(0);
  const [isTurnLeft, setTurnLeft] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    moveForward: (posCoordX, posCoordY, direction) => {
      // reset look-at (target) and camera position
      //controls.current.target.set(0, 0, 0);
      setTargetX(posCoordX);
      setTargetZ(posCoordY);
      setDirection(direction);
      // needed for trackball controls, reset the up vector
      //camera.up.set(
      //  controls.current.up0.x,
      //  controls.current.up0.y,
      //  controls.current.up0.z
      //);
    },
    turnLeft: (posCoordX, posCoordY, direction) => {
      setTargetX(posCoordX);
      setTargetZ(posCoordY);
      setDirection(direction);
      setCurrentAngle(90 + currentAngle);
    },
    turnRight: (posCoordX, posCoordY, direction) => {
      setTargetX(posCoordX);
      setTargetZ(posCoordY);
      setDirection(direction);
      setCurrentAngle(currentAngle - 90);
    },
  }));

  useFrame(() => {
    // update the view as the vis is interacted with
    //controls.current.update();
    switch (targetDirection) {
      case 0:
        if (camera.position.z > targetZ) {
          camera.position.z -= 0.5;
          camera.lookAt(camera.position.x, 0, targetZ - 10);
        }
        break;
      case 3:
        if (camera.position.x < targetX) {
          camera.position.x += 0.5;
          camera.lookAt(targetX + 10, 0, camera.position.z);
        }
        break;
      case 2:
        if (camera.position.z < targetZ) {
          camera.position.z += 0.5;
          camera.lookAt(camera.position.x, 0, targetZ + 10);
        }
        break;
      case 1:
        if (camera.position.x > targetX) {
          camera.position.x -= 0.5;
          camera.lookAt(targetX - 10, 0, camera.position.z);
        }
        break;
    }
    camera.updateProjectionMatrix()

    //camera.lookAt(camera.position.x, 0, camera.position.z);
    if (currentAngle > 0) {
      camera.rotateY(THREE.Math.degToRad(-2));
      setCurrentAngle(currentAngle - 2);
    } else if (currentAngle < 0) {
      camera.rotateY(THREE.Math.degToRad(2));
      setCurrentAngle(currentAngle + 2);
    }
  });

  return (
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      keys={[
        ALT_KEY, // orbit
        CTRL_KEY, // zoom
        CMD_KEY, // pan
      ]}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
        MIDDLE: THREE.MOUSE.ZOOM,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};

export default React.forwardRef(Controls);
