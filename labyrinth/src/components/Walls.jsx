import * as React from 'react';
import { Box } from '@react-three/drei'
import { shuffleArray, UnionFind } from "../commons/utils";

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

/* Given an wall index, output the neighbour cell index (In x+z*numZ format) */
function getWallNeighbourCells(numX, numCells, wallIndex) {
  if (wallIndex < numCells) {
    // wallIndex < numCells, it is a horizontal wall
    return [wallIndex - numX, wallIndex];
  } else {
    return [wallIndex - numCells - 1, wallIndex - numCells];
  }
}

export function initLabyrinthWalls(numX, numZ) {
  // The algorithm is:
  // We put all cells of a maze into a disjointed set, and set them as
  // disjointed. Then we random select a wall. If the two cells separated
  // by the wall is not connected, we tear down the wall, otherwise we keep
  // the wall and choose another wall. We do this until there's only only
  // connecting compoments left.
  const numCells = numX * numZ;
  const numCellPlusBorder = (numX+1) * (numZ+1);
  const unionFind = new UnionFind(numCells);
  let wallArray = [];
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

  const wallLeft = Array.apply(null, { length: numCellPlusBorder }).fill(false);
  const wallTop = Array.apply(null, { length: numCellPlusBorder }).fill(false);
  for (let i = 0; i < numX; i++) {
    // Make the top border to be true
    wallTop[i] = true;
    // Make the bottom border to be true
    wallTop[i + numZ*(numX+1)] = true;
  }
  for (let i = 0; i < numZ; i++) {
    // Make the left border to be true
    wallLeft[i * (numX+1)] = true;
    // Make the right border to be true
    wallLeft[i * (numX+1) + numX] = true;
  }

  const convertIndex = val =>((~~(val / numX))*(numX+1) + val%numX);
  for (let i = 0; i < resArray.length; i++) {
    if (resArray[i] < numCells) {
      wallTop[convertIndex(resArray[i])] = true;
    } else {
      wallLeft[convertIndex(resArray[i] - numCells)] = true;
    }
  }

  wallLeft[0] = false;
  wallLeft[numCellPlusBorder-1] = false;
  wallTop[numCellPlusBorder-1] = false;
  wallTop[numCellPlusBorder-2] = false;
  return [wallLeft, wallTop];
}

function GenHorizontalWall(x, z, width, height, depth) {
  return (
    <Box key={String(x) + ',' + String(z) + "top"}
      args={[width, height, depth]}
      rotation={[0, 0, 0]}
      position={[x + width / 2, 0, z]}>
      <meshPhongMaterial color="orange" attach="material" />
    </Box>
  );
}

function GenVerticalWall(x, z, width, height, depth) {
  return (
    <Box key={String(x) + ',' + String(z) + "left"}
      args={[width, height, depth]}
      rotation={[0, Math.PI * 0.5, 0]}
      position={[x, 0, z + width / 2]}>
      <meshPhongMaterial color="orange" attach="material" />
    </Box>
  );
}

export function Walls(
  { numX,
    numZ,
    wallTop,
    wallLeft,
    blockWidth,
    blockHeight,
    blockDepth,
    mazeWidth,
    mazeDepth }
) {
  const walls = [];
  for (let i = 0; i < numX+1; i++) {
    for (let j = 0; j < numZ+1; j++) {
      if (wallTop[i + (numX+1) * j]) {
        walls.push(
          GenHorizontalWall(
            -mazeWidth/2 + i * blockWidth - blockDepth / 2,
            -mazeDepth/2 + j * blockWidth,
            blockWidth + blockDepth,
            blockHeight,
            blockDepth
          )
        );
      }
      if (wallLeft[i + (numX+1) * j]) {
        walls.push(
          GenVerticalWall(
            -mazeWidth/2 + i * blockWidth,
            -mazeDepth/2 + j * blockWidth - blockDepth / 2,
            blockWidth + blockDepth,
            blockHeight,
            blockDepth
          )
        );
      }
    }
  }

  return (
    <group name="walls">
      {walls}
    </group>
  );
}
