import * as React from 'react';
import { Canvas, useFrame, useUpdate } from 'react-three-fiber'
import Controls from './Controls';
import * as THREE from "three";


class UnionFind {
  partsCount;
  rank;
  path;

  constructor(elementNum) {
    this.partsCount = elementNum;
    this.path = Array.apply(null, { length: elementNum }).map(Number.call, Number)
    this.rank = Array.apply(0, { length: elementNum });
  }

  find(index) {
    while (index !== this.path[index]) {
      this.path[index] = this.path[this.path[index]];
      index = this.path[index];
    }
    return index;
  }

  union(left, right) {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot === rightRoot) {
      return;
    }
    this.partsCount -= 1;
    if (this.rank[leftRoot] < this.rank[rightRoot]) {
      this.path[leftRoot] = rightRoot;
    } else if (this.rank[leftRoot] > this.rank[rightRoot]) {
      this.path[rightRoot] = leftRoot;
    } else {
      this.path[leftRoot] = rightRoot;
      this.rank[rightRoot] += 1;
    }
  }

}

function shuffleArray(targetArray) {
  // Reference: https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const length = targetArray.length;
  for (let i = length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = targetArray[i];
    targetArray[i] = targetArray[j];
    targetArray[j] = tmp;
  }
  return targetArray;
};


class LabyrinthTools {

  static getWallNeighbourCells(numX, numCells, wallIndex) {
    if (wallIndex < numCells) {
      return [wallIndex - numX, wallIndex];
    } else {
      return [wallIndex - numCells - 1, wallIndex - numCells];
    }
  }

  static initLabyrinth(numX, numY) {
    const numCells = numX * numY;
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
      const [neighborA, neighborB] = this.getWallNeighbourCells(numX, numCells, currentWall);
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

    const wallLeft = Array.apply(null, { length: numCells }).fill(false);
    const wallTop = Array.apply(null, { length: numCells }).fill(false);
    for (let i = 0; i < numX; i++) {
      wallTop[i] = true;
    }
    for (let i = 0; i < numY; i++) {
      wallLeft[i * numX] = true;
    }
    for (let i = 0; i < resArray.length; i++) {
      if (resArray[i] < numCells) {
        wallTop[resArray[i]] = true;
      } else {
        wallLeft[resArray[i] - numCells] = true;
      }
    }
    return [wallLeft, wallTop]

  };
}

function genHorizontalWall(x, z, width, height, depth) {
  return (
    <mesh position={[x + width / 2, 0, z]} rotation={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[width, height, depth]} />
      <meshLambertMaterial attach="material" color="orange" />
    </mesh>
  );
}

function genVerticalWall(x, z, width, height, depth) {
  return (
    <mesh position={[x, 0, z + width / 2]} rotation={[0, Math.PI * 0.5, 0]}>
      <boxBufferGeometry attach="geometry" args={[width, height, depth]} />
      <meshLambertMaterial attach="material" color="orange" />
    </mesh>
  )

}

function genWalls(numX, numY, wallTop, wallLeft, blockWidth, blockHeight, blockDepth) {
  const walls = []
  for (let i = 0; i < numX; i++) {
    for (let j = 0; j < numY; j++) {
      if (wallTop[i + numX * j]) {
        walls.push(genHorizontalWall(-200 + i * blockWidth - blockDepth / 2, -200 + j * blockWidth, blockWidth + blockDepth, blockHeight, blockDepth));
      }
      if (i === 0 && j === 0) {
        continue;
      }
      if (wallLeft[i + numX * j]) {
        walls.push(genVerticalWall(-200 + i * blockWidth, -200 + j * blockWidth - blockDepth / 2, blockWidth + blockDepth, blockHeight, blockDepth));
      }
    }
  }
  for (let i = 0; i < numX; i++) {
    walls.push(genHorizontalWall(-200 + i * blockWidth - blockDepth / 2, -200 + numY * blockWidth, blockWidth + blockDepth, blockHeight, blockDepth));
  }
  for (let i = 0; i < numY - 1; i++) {
    walls.push(genVerticalWall(-200 + numX * blockWidth, -200 + i * blockWidth - blockDepth / 2, blockWidth + blockDepth, blockHeight, blockDepth));
  }
  return walls;
}


function Dolly() {
  useFrame(state => {
    state.camera.rotation.y = 90 * Math.PI / (90)
    state.camera.position.z = state.camera.position.z - 0.1
    //state.camera.lookAt(state.camera.position.x*state.clock.getElapsedTime(), 0, -400);
    state.camera.updateProjectionMatrix()

  })
  return null
}

function Labyrinth({ }, ref) {
  const [numX, numY] = [10, 10];
  const blockWidth = 40;
  const blockHeight = 20;
  const blockDepth = 1;
  const [[wallLeft, wallTop],] = React.useState(LabyrinthTools.initLabyrinth(numX, numY));
  // 0: Up, 1: right, 2: down, 3: left
  const [direction, setDirection] = React.useState(0);
  const [currentPosX, setPosX] = React.useState(numX);
  const [currentPosY, setPosY] = React.useState(numY);
  const controlsRef = React.useRef();
  const startX = -numX * blockWidth / 2;
  const startY = -numY * blockWidth / 2;
  const posCoordX = () => (-blockWidth/2 + currentPosX * blockWidth + startX);
  const posCoordY = () => (-blockWidth/2  + currentPosY * blockWidth + startY);
  const newPosCoordX = (val) => (-blockWidth/2  + val * blockWidth + startX);
  const newPosCoordY = (val) => (-blockWidth/2  + val * blockWidth + startY);
  console.log(posCoordX(), posCoordY());
  React.useImperativeHandle(ref, () => ({
    moveForward: () => {
      console.log("Before: ", currentPosX, currentPosY, direction);
      let newX = 0;
      let newY = 0;
      switch (direction) {
        case 0: setPosY(currentPosY - 1);
          newY = currentPosY - 1;
          break;
        case 3: setPosX(currentPosX + 1);
          newX = currentPosX + 1;
          break;
        case 2: setPosY(currentPosY + 1);
          newY = currentPosY + 1;

          break;
        case 1: setPosX(currentPosX - 1);
          newX = currentPosX - 1;
          break;
        default:
          console.log("Direction error: ", direction);
      }
      console.log("After: ", currentPosX, currentPosY, direction);

      return controlsRef.current.moveForward(newPosCoordX(newX), newPosCoordY(newY), direction);
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
    <Canvas camera={{
      fov: 80, position: [posCoordX(), 0, posCoordY()]}}>
      <Controls
        ref={controlsRef} />
      <ambientLight color="#ffffff" intensity={0.1} />
      <spotLight intensity={1} position={[300, 300, 4000]} />

      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      {genWalls(numX, numY, wallTop, wallLeft, blockWidth, blockHeight, blockDepth)}
      <mesh position={[0, -10, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[400, 400, 0.1]} />
        <meshToonMaterial attach="material" color="#405940" />
      </mesh>
      <mesh position={[0, 10, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[400, 400, 0.1]} />
        <meshMatcapMaterial attach="material" color="lightblue" />
      </mesh>

    </Canvas>
  );
}


export default React.forwardRef(Labyrinth);
