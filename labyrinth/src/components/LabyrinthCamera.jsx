import * as React from "react";
import { useThree, useFrame } from "react-three-fiber";
import { Math as ThreeMath } from "three";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAction,
  selectPosX,
  selectPosZ,
  popEvent,
  selectDirection,
  MOVE_FORWARD,
  MOVE_BACKWARD,
  TURN_LEFT,
  TURN_RIGHT,
  NOTHING,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  selectIsResetCamera,
  assignResetCamera,
  INTERRUPTED,
} from "../reducers/controlSlice";
import {
  selectBuff,
  selectDebuff,
  SPEED_DOWN,
  SPEED_UP,
} from "../reducers/playerStatusSlice";

// Make the camera look ahead, can be any value greater than 0
const DIRECTION_ADJUSTER = 0.1;
// The speed modifier multiplier if a buff/debuff is applied
const SPEED_MODIFIER = 2;

// Handle the change of the camera during player movement
export default function LabyrinthCamera({
  blockWidth,
  startCoordX,
  startCoordZ,
  cameraInitCoordX,
  cameraInitCoordZ,
  moveSpeed,
  turnSpeed,
}) {
  const { camera } = useThree();

  // currentAction marks whether the move animation is ongoing or finished
  const currentAction = useSelector(selectAction);

  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);

  // The move direction
  const direction = useSelector(selectDirection);

  // Buff and debuff affects the move speed
  const buff = useSelector(selectBuff);
  const debuff = useSelector(selectDebuff);
  let speedModifier = 1;
  if (buff & SPEED_UP) {
    speedModifier = SPEED_MODIFIER;
  } else if (debuff & SPEED_DOWN) {
    speedModifier = 1 / SPEED_MODIFIER;
  }
  const actualMoveSpeed = moveSpeed * speedModifier;
  const actualTurnSpeed = turnSpeed * speedModifier;

  // Current angle is the remaining angle the camera needs to rotate
  // Set it as a ref because this value changes consistantly each frame,
  // it is mutable in nature.
  const currentAngle = React.useRef(0);

  // calculate the target coordinate based on the position index.
  // coordinate is the position info in the 3D world, they are continuous values.
  // We only use them when rendering 3D objects.
  // Position index is the discreted index in the game logic, we use this when
  // handling the game logic, like the start point, occur an event or go to the
  // finish line.
  const coordX = -blockWidth / 2 + (posX + 1) * blockWidth + startCoordX;
  const coordZ = -blockWidth / 2 + (posZ + 1) * blockWidth + startCoordZ;

  const isResetCamera = useSelector(selectIsResetCamera);

  const dispatch = useDispatch();
  // useFrame function is called in each frame, it handles the animation of the threejs 3D world
  useFrame(() => {
    // controls.current.update();
    // When game is restarted, camera needs to be reset as well.
    if (!isResetCamera) {
      camera.position.x = cameraInitCoordX;
      camera.position.z = cameraInitCoordZ;
      dispatch(assignResetCamera(true));
    }
    // Move the camera according to current action
    switch (currentAction) {
      case MOVE_FORWARD:
        switch (direction) {
          case UP:
            // The camera postion hasn't reached target position,
            // we need to continue the animation.
            if (camera.position.z > coordZ) {
              camera.position.z -= actualMoveSpeed;
              // Make the camera look forward
              camera.lookAt(
                camera.position.x,
                0,
                camera.position.z - DIRECTION_ADJUSTER
              );
            }
            break;
          case LEFT:
            if (camera.position.x > coordX) {
              camera.position.x -= actualMoveSpeed;
              camera.lookAt(
                camera.position.x - DIRECTION_ADJUSTER,
                0,
                camera.position.z
              );
            }
            break;
          case DOWN:
            if (camera.position.z < coordZ) {
              camera.position.z += actualMoveSpeed;
              camera.lookAt(
                camera.position.x,
                0,
                camera.position.z + DIRECTION_ADJUSTER
              );
            }
            break;
          case RIGHT:
            if (camera.position.x < coordX) {
              camera.position.x += actualMoveSpeed;
              camera.lookAt(
                camera.position.x + DIRECTION_ADJUSTER,
                0,
                camera.position.z
              );
            }
            break;
          default:
          // console.log("direction error!");
        }
        // The camera postion has been near enough to the target position,
        // So that if the camera move one step it we will be leaving the target rather
        // than approaching it, need to stop the animation
        if (Math.abs(camera.position.x - coordX) < actualMoveSpeed) {
          if (Math.abs(camera.position.z - coordZ) < actualMoveSpeed) {
            camera.position.x = coordX;
            camera.position.z = coordZ;
            // Stop current animation
            dispatch(popEvent());
          }
        }
        break;
      case MOVE_BACKWARD:
        switch (direction) {
          case UP:
            if (camera.position.z < coordZ) {
              camera.lookAt(
                camera.position.x,
                0,
                camera.position.z - DIRECTION_ADJUSTER
              );
              camera.position.z += actualMoveSpeed;
            }
            break;
          case LEFT:
            if (camera.position.x < coordX) {
              camera.position.x += actualMoveSpeed;
              camera.lookAt(
                camera.position.x - DIRECTION_ADJUSTER,
                0,
                camera.position.z
              );
            }
            break;
          case DOWN:
            if (camera.position.z > coordZ) {
              camera.position.z -= actualMoveSpeed;
              camera.lookAt(
                camera.position.x,
                0,
                camera.position.z + DIRECTION_ADJUSTER
              );
            }
            break;
          case RIGHT:
            if (camera.position.x > coordX) {
              camera.position.x -= actualMoveSpeed;
              camera.lookAt(
                camera.position.x + DIRECTION_ADJUSTER,
                0,
                camera.position.z
              );
            }
            break;
          default:
          // console.log("direction error!");
        }
        if (Math.abs(camera.position.x - coordX) < actualMoveSpeed) {
          if (Math.abs(camera.position.z - coordZ) < actualMoveSpeed) {
            camera.position.x = coordX;
            camera.position.z = coordZ;
            dispatch(popEvent());
          }
        }
        break;
      case TURN_LEFT:
        if (currentAngle.current === 0) {
          currentAngle.current += 90;
        }
        if (currentAngle.current > 0) {
          camera.rotateY(ThreeMath.degToRad(actualTurnSpeed));
          currentAngle.current -= actualTurnSpeed;
        }
        // The camera has reached the target angle, need to stop the animation.
        if (Math.abs(currentAngle.current) < actualTurnSpeed) {
          dispatch(popEvent());
          currentAngle.current = 0;
        }
        break;
      case TURN_RIGHT:
        if (currentAngle.current === 0) {
          currentAngle.current -= 90;
        }
        if (currentAngle.current < 0) {
          camera.rotateY(ThreeMath.degToRad(-actualTurnSpeed));
          currentAngle.current += actualTurnSpeed;
        }
        if (Math.abs(currentAngle.current) < actualTurnSpeed) {
          dispatch(popEvent());
          currentAngle.current = 0;
        }
        break;
      case NOTHING:
        break;
      case INTERRUPTED:
        break;
      default:
      // console.log("button error!");
    }
    // Necessary for reflecting the change
    camera.updateProjectionMatrix();
  });

  return (
    <group name="camera">
    </group>
  );
}
