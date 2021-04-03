import * as React from "react";
import { Object3D } from "three";
import { Box, Text } from "@react-three/drei";
import { shuffleArray, UnionFind } from "../commons/utils";

/* Given an wall index, output the neighbour cell index (In x+z*numZ format) */
function getWallNeighbourCells(numX, numCells, wallIndex) {
  if (wallIndex < numCells) {
    // wallIndex < numCells, it is a horizontal wall
    return [wallIndex - numX, wallIndex];
  } else {
    return [wallIndex - numCells - 1, wallIndex - numCells];
  }
}

// Initialize the maze layout
// Input: number of cells in the X and Z axis
// Output: wallTop and wallLeft matrix, denote whether there is a wall
// on the top/left of a cell respectively.
export function initLabyrinthWalls(numX, numZ) {
  const numCells = numX * numZ;
  const numCellPlusBorder = (numX + 1) * (numZ + 1);
  const unionFind = new UnionFind(numCells);
  // An array of indexes of walls.
  // The outemost walls of a maze is not needed in the maze generation, given
  // that they do not separate cells, so they are not in the wallArray.
  // Wall global index definination example:
  // (The below two pictures are the same 3*3 maze, we separte vertical and horizontal walls to make it looks more clear)
  //
  //   012
  //   ---
  //   345
  //   ---
  //   678
  //
  //  9|10|11|
  // 12|13|14|
  // 15|16|17|
  //
  let wallArray = [];
  // The array that contains the remaining walls that can build a maze.
  let resArray = [];
  for (let i = numX; i < numCells; i++) {
    wallArray.push(i);
  }
  for (let i = numCells; i < numCells * 2; i++) {
    if (i % numX !== 0) {
      wallArray.push(i);
    }
  }
  wallArray = shuffleArray(wallArray);
  let currentPos = wallArray.length - 1;

  // The algorithm is:
  // We put all cells of a maze into a disjointed set, and set them as
  // disjointed. Then we random select a wall. If the two cells separated
  // by the wall is not connected, we tear down the wall, otherwise we keep
  // the wall and choose another wall. We do this until there's only only
  // connecting compoments left.
  do {
    const currentWall = wallArray[currentPos];
    const [neighborA, neighborB] = getWallNeighbourCells(
      numX,
      numCells,
      currentWall
    );
    if (unionFind.find(neighborA) === unionFind.find(neighborB)) {
      resArray.push(currentWall);
    } else {
      unionFind.union(neighborA, neighborB);
    }
    currentPos -= 1;
  } while (unionFind.partsCount !== 1);
  while (currentPos >= 0) {
    resArray.push(wallArray[currentPos]);
    currentPos -= 1;
  }

  // Convert wall index array of remaining walls to wallTop and wallLeft array.
  let numWalls = 0;
  const wallLeft = Array.apply(null, { length: numCellPlusBorder }).fill(false);
  const wallTop = Array.apply(null, { length: numCellPlusBorder }).fill(false);
  for (let i = 0; i < numX; i++) {
    // Make the top border to be true
    wallTop[i] = true;
    // Make the bottom border to be true
    wallTop[i + numZ * (numX + 1)] = true;
    numWalls += 2;
  }
  for (let i = 0; i < numZ; i++) {
    // Make the left border to be true
    wallLeft[i * (numX + 1)] = true;
    // Make the right border to be true
    wallLeft[i * (numX + 1) + numX] = true;
    numWalls += 2;
  }

  const convertIndex = (val) => ~~(val / numX) * (numX + 1) + (val % numX);
  for (let i = 0; i < resArray.length; i++) {
    if (resArray[i] < numCells) {
      wallTop[convertIndex(resArray[i])] = true;
    } else {
      wallLeft[convertIndex(resArray[i] - numCells)] = true;
    }
    numWalls += 1;
  }

  wallLeft[0] = false;
  wallTop[numCellPlusBorder - 2] = false;
  numWalls -= 2;
  return [wallLeft, wallTop, numWalls];
}

function genPositionHorizontal(x, z, width) {
  return [x + width / 2, 0, z];
}
function genPositionVertical(x, z, width) {
  return [x, 0, z + width / 2];
}

// To reuse this object creating new walls
// Ref: https://codesandbox.io/s/r3f-demo-3-es4ru?from-embed
const scratchObject3D = new Object3D();

// Render walls in the gameview.
export default function Walls({
  numX,
  numZ,
  wallTop,
  wallLeft,
  numWalls,
  blockWidth,
  blockHeight,
  blockDepth,
  mazeWidth,
  mazeDepth,
}) {
  // Use instanceMesh to optimize GPU usage
  const meshRef = React.useRef();
  const initWalls = () => {
    let curNumWalls = 0;
    const mesh = meshRef.current;
    for (let i = 0; i < numX + 1; i++) {
      for (let j = 0; j < numZ + 1; j++) {
        if (wallTop[i + (numX + 1) * j]) {
          const [posX, posY, posZ] = genPositionHorizontal(
            -mazeWidth / 2 + i * blockWidth - blockDepth / 2,
            -mazeDepth / 2 + j * blockWidth,
            blockWidth + blockDepth
          );
          // Ref: https://codesandbox.io/s/r3f-demo-3-es4ru?from-embed
          scratchObject3D.position.set(posX, posY, posZ);
          scratchObject3D.rotation.set(0, 0, 0);
          scratchObject3D.updateMatrix();
          mesh.setMatrixAt(curNumWalls, scratchObject3D.matrix);
          curNumWalls += 1;
        }
        if (wallLeft[i + (numX + 1) * j]) {
          const [posX, posY, posZ] = genPositionVertical(
            -mazeWidth / 2 + i * blockWidth,
            -mazeDepth / 2 + j * blockWidth - blockDepth / 2,
            blockWidth + blockDepth
          );
          scratchObject3D.position.set(posX, posY, posZ);
          scratchObject3D.rotation.set(0, Math.PI * 0.5, 0);
          scratchObject3D.updateMatrix();
          mesh.setMatrixAt(curNumWalls, scratchObject3D.matrix);
          curNumWalls += 1;
        }
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  };

  // Update walls only when we need to initWalls
  React.useEffect(initWalls, [
    numX,
    numZ,
    wallTop,
    wallLeft,
    blockWidth,
    blockHeight,
    blockDepth,
    mazeWidth,
    mazeDepth,
  ]);
  return (
    <group name="walls">
      <instancedMesh
        ref={meshRef}
        args={[null, null, numWalls]}
        frustumCulled={false}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[blockWidth + blockDepth, blockHeight, blockDepth]}
        />
        <meshPhongMaterial color="orange" attach="material" />
      </instancedMesh>
      {/* The starting point glass door with text on it
        Ref: https://codesandbox.io/s/r3f-demo-2-prj0b?from-embed */}
      <Box
        key={"entrance"}
        args={[blockWidth + blockDepth, blockHeight, blockDepth]}
        rotation={[0, 0, 0]}
        position={[
          -mazeWidth / 2 + (numX - 0.5) * blockWidth - blockDepth / 2,
          0,
          -mazeDepth / 2 + numZ * blockWidth,
        ]}
      >
        <meshPhongMaterial
          color="blue"
          attach="material"
          transparent
          opacity={0.2}
        />
        <Text
          color={"#db5c27"}
          fontSize={2}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={"left"}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX={blockWidth / 5}
          anchorY="100%"
          depthOffset={10}
        >
          Entrance
        </Text>
      </Box>
      {/* The exit point glass door with text on it*/}
      <Box
        key={"exit"}
        args={[blockWidth + blockDepth, blockHeight, blockDepth]}
        rotation={[0, Math.PI * 0.5, 0]}
        position={[
          -mazeWidth / 2,
          0,
          -mazeDepth / 2 - blockDepth / 2 + blockWidth / 2,
        ]}
      >
        <meshPhongMaterial
          color="green"
          attach="material"
          transparent
          opacity={0.2}
        />
        <Text
          color={"#db5c27"}
          fontSize={2}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={"left"}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX={blockWidth / 8}
          anchorY="100%"
          depthOffset={10}
        >
          Exit
        </Text>
      </Box>
    </group>
  );
}
