import * as React from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';

// extend THREE to include TrackballControls
extend({ TrackballControls });

const Controls = (props, ref) => {
  const controls = React.useRef();
  const { camera, gl } = useThree();

  // TODO(weijia): make these constant states or props
  const [targetX, setTargetX] = React.useState(180);
  const [targetZ, setTargetZ] = React.useState(180);
  const [targetDirection, setDirection] = React.useState(0);
  // Current angle is the remaining angle the camera needs to rotate
  const [currentAngle, setCurrentAngle] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    moveForward: (posCoordX, posCoordY, direction) => {
      setTargetX(posCoordX);
      setTargetZ(posCoordY);
      setDirection(direction);

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
      default:
        console.log("direction error!");
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
    />
  );
};

export default React.forwardRef(Controls);
