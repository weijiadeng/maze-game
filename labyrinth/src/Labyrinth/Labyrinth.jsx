import * as React from 'react';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber'
import Controls from './Controls';
import * as THREE from "three";
import { Walls, initLabyrinthWalls } from './Walls';
import { Sky, Box, Plane } from '@react-three/drei'
import "./Labyrinth.css"

function Labyrinth(props, ref) {

  const numX = props.numX;
  const numZ = props.numZ;
  const blockWidth = props.blockWidth;
  const blockHeight = props.blockHeight;
  const blockDepth = props.blockDepth;
  const mazeDepth = props.mazeDepth;
  const mazeWidth = props.mazeWidth;

  // Direction definination:
  //
  //             top
  //      ^
  //      |
  //      | z
  //      | 
  // left | a             right
  //      | x
  //      | i
  //      | s
  //      |______________>
  //            x axis
  //
  //            bottom

  // WallLeft and wall top are two conceptual matrix of booleans(they are flattened to arrays for performance), recording
  // whether a wall exist or not for a certain cell.
  //
  // wallTop: whether the wall on the top(in the 2D world) of a cell exists
  // wallLeft: whether the wall on the left of a cell exists
  // The isExist information for the wall on the right of the cell is provided by the wallLeft of the cell's right neighbour cell, so as for
  // the bottom wall.
  //
  // To lookup the top wall info cell(x, y), we call wallTop[x + y*numZ]
  const [[wallLeft, wallTop],] = React.useState(initLabyrinthWalls(numX, numZ));
  // direction is the orientation the camera faces to.
  // 0: Up, 1: right, 2: down, 3: left
  const [direction, setDirection] = React.useState(0);
  // currentPosX is the current cell index(in X axis)
  const [currentPosX, setPosX] = React.useState(numX);
  // currentPosZ is the current cell index(in Z axis)
  const [currentPosZ, setPosZ] = React.useState(numZ);
  // Handle for the controler
  const controlsRef = React.useRef();
  // Starting point in the x and z axis(this is coordinate, not index)
  const startCoordX = -numX * blockWidth / 2;
  const startCoordY = -numZ * blockWidth / 2;
  // Get the current logical coordinate
  const posCoordX = () => (-blockWidth / 2 + currentPosX * blockWidth + startCoordX);
  const posCoordY = () => (-blockWidth / 2 + currentPosZ * blockWidth + startCoordY);
  // An ugly work around to solve the invariance problem within the same call for the state update
  // TODO(weijia): remove this work around
  const newPosCoordX = (val) => (-blockWidth / 2 + val * blockWidth + startCoordX);
  const newPosCoordY = (val) => (-blockWidth / 2 + val * blockWidth + startCoordY);

  // TODO(weijia): Maybe combine these with the functions in Control?
  React.useImperativeHandle(ref, () => ({
    moveForward: () => {
      let newX = 0;
      let newZ = 0;
      switch (direction) {
        case 0: setPosZ(currentPosZ - 1);
          newZ = currentPosZ - 1;
          break;
        case 1: setPosX(currentPosX - 1);
          newX = currentPosX - 1;
          break;

        case 2: setPosZ(currentPosZ + 1);
          newZ = currentPosZ + 1;

          break;
        case 3: setPosX(currentPosX + 1);
          newX = currentPosX + 1;
          break;

        default:
          console.log("Direction error: ", direction);
      }
      return controlsRef.current.moveForward(newPosCoordX(newX), newPosCoordY(newZ), direction);
    },
    turnLeft: () => {
      setDirection((direction + 1) % 4);
      return controlsRef.current.turnRight(posCoordX(), posCoordY(), (direction + 1) % 4);
    },
    turnRight: () => {
      // To make the mod non-negative;
      setDirection(((direction - 1) % 4 + 4) % 4);
      return controlsRef.current.turnLeft(posCoordX(), posCoordY(), ((direction - 1) % 4 + 4) % 4);
    }
  }));

  return (
    <div className="canvas-div">
      <Canvas camera={{
        fov: 80, position: [posCoordX(), 0, posCoordY() + blockWidth]
      }}>
        {/* TODO(weijia): Add params to the controls */}
        <Controls
          ref={controlsRef} />
        <ambientLight color="#ffffff" intensity={0.4} />
        {/* Reference: https://drei.pmnd.rs/?path=/story/shaders-softshadows--soft-shadows-st
            Make the light the same direction with the sun
        */}
        <directionalLight
          position={[-500, 20, -180]}
          intensity={1.5}
        />
        <Walls
          numX={numX}
          numZ={numZ}
          wallTop={wallTop}
          wallLeft={wallLeft}
          blockWidth={blockWidth}
          blockHeight={blockHeight}
          blockDepth={blockDepth}
          mazeWidth={mazeWidth}
          mazeDepth={mazeDepth}
        />
        <Sky
          distance={10000} // Camera distance (default=450000)
          // Sun position normal(Make the exit faces the sun, x should be less than -mazeWidth+blockWidth, 
          // y should be greater than 0, z should be -mazeHeight+blockWidth)
          sunPosition={[-500, 20, -180]}
          inclination={0} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        <Plane rotation-x={-Math.PI / 2} position={[0, -10, 0]} args={[400, 400, 4, 4]}>
          <meshBasicMaterial attach="material" opacity={0.5} color="#405940" />
        </Plane>
      </Canvas>
    </div>
  );
}

export default React.forwardRef(Labyrinth);
