import * as React from 'react';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber'
import { Controls } from './Controls/Controls';
import { ReactReduxContext } from 'react-redux';
import * as THREE from "three";
import { Walls, initLabyrinthWalls } from './Walls';
import { Sky, Plane, useContextBridge } from '@react-three/drei'
import {
  assignPosX,
  assignPosZ,
  selectPosX,
  selectPosZ,
  UNINIT,
} from './Controls/controlSlice';
import { useSelector, useDispatch } from 'react-redux';
import "./Labyrinth.css"

export function Labyrinth(props) {

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
  console.log(wallLeft);
  const posX = useSelector(selectPosX);
  const posZ = useSelector(selectPosZ);
  const dispatch = useDispatch();

  if (posX === UNINIT) {
    dispatch(assignPosX(Number(numX)));
  }
  if (posZ === UNINIT) {
    dispatch(assignPosZ(Number(numZ)))
  }

  // Starting point in the x and z axis(this is coordinate, not index)
  const startCoordX = -numX * blockWidth / 2;
  const startCoordZ = -numZ * blockWidth / 2;
  // Get the current view coordinate
  const posCoordX = -blockWidth / 2 + numX * blockWidth + startCoordX;
  const posCoordY = -blockWidth / 2 + numZ * blockWidth + startCoordZ;

  // Needed to use react-redux in react-three-fiber canvas. 
  // For details: https://standard.ai/blog/introducing-standard-view-and-react-three-fiber-context-bridge/
  const ContextBridge = useContextBridge(ReactReduxContext);

  return (
    <div className="canvas-div">
      <Canvas camera={{
        fov: 80, position: [posCoordX, 0, posCoordY + blockWidth]
      }}>
        {/* TODO(weijia): Add params to the controls */}
        <ContextBridge>
          <Controls
            wallTop={wallTop}
            wallLeft={wallLeft}
            blockWidth={blockWidth}
            startCoordX={startCoordX}
            startCoordZ={startCoordZ}
            moveSpeed={0.5}
            turnSpeed={2}
          />
        </ContextBridge>
        <ambientLight color="#ffffff" intensity={0.4} />
        {/* Reference: https://drei.pmnd.rs/?path=/story/shaders-softshadows--soft-shadows-st
            Make the light the same direction with the sun
        */}
        <directionalLight
          position={[-500, 20, startCoordZ + blockWidth / 2]}
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
          sunPosition={[-500, 20, startCoordZ + blockWidth / 2]}
          inclination={0} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        />
        <Plane rotation-x={-Math.PI / 2} position={[0, -10, 0]} args={[400, 400, 4, 4]}>
          <meshBasicMaterial attach="material" opacity={0.5} color="#405940" />
        </Plane>
        {/* <fog attach="fog" args={['black', 0, 40]} /> */}
      </Canvas>
    </div>
  );
}
