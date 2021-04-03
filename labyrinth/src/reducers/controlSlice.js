import { createSlice } from "@reduxjs/toolkit";

export const MOVE_FORWARD = 0;
export const TURN_LEFT = 2;
export const TURN_RIGHT = 1;
export const MOVE_BACKWARD = 3;
export const NOTHING = 4;
export const INTERRUPTED = 6;
export const CACHE_UNUSED = 7;
export const UP = 0;
export const RIGHT = 3;
export const DOWN = 2;
export const LEFT = 1;

export const controlSlice = createSlice({
  name: "control",
  initialState: {
    direction: 0,
    posX: 0,
    posZ: 0,
    // Used to block a new action when an action is exectuting
    currentAction: MOVE_FORWARD,
    actionCache: CACHE_UNUSED,
    isInit: false,
    wallTop: [],
    wallLeft: [],
    numWalls: 0,
    numX: 5,
    numZ: 5,
    lastMoveHitWall: false,
    isResetCamera: false,
    resetEvent: true,
  },
  reducers: {
    moveForward: (state) => {
      if (state.currentAction === NOTHING) {
        state.currentAction = MOVE_FORWARD;
        switch (state.direction) {
          case UP:
            // Check if there is a wall
            if (
              !(
                state.posX >= 0 &&
                state.posX <= state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallTop[state.posX + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posZ -= 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case RIGHT:
            if (
              !(
                state.posX >= 0 &&
                state.posX < state.numX &&
                state.posZ >= 0 &&
                state.posZ < state.numZ &&
                state.wallLeft[state.posX + 1 + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posX += 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case DOWN:
            if (
              !(
                state.posX >= 0 &&
                state.posX < state.numX &&
                state.posZ >= 0 &&
                state.posZ < state.numZ &&
                state.wallTop[state.posX + (state.posZ + 1) * (state.numX + 1)]
              ) &&
              !(state.posX === state.numX - 1 && state.posZ === state.numZ - 1)
            ) {
              state.posZ += 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case LEFT:
            if (
              !(
                state.posX >= 0 &&
                state.posX <= state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallLeft[state.posX + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posX -= 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          default:
          // console.log("Direction error: ", state.direction);
        }
      }
    },
    moveBackward: (state) => {
      if (state.currentAction === NOTHING) {
        state.currentAction = MOVE_BACKWARD;
        switch (state.direction) {
          case UP:
            if (
              !(
                state.posX >= 0 &&
                state.posX <= state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallTop[state.posX + (state.posZ + 1) * (state.numX + 1)]
              ) &&
              !(state.posX === state.numX - 1 && state.posZ === state.numZ - 1)
            ) {
              state.posZ += 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case RIGHT:
            if (
              !(
                state.posX >= 0 &&
                state.posX < state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallLeft[state.posX + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posX -= 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case DOWN:
            if (
              !(
                state.posX >= 0 &&
                state.posX < state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallTop[state.posX + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posZ -= 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          case LEFT:
            if (
              !(
                state.posX >= 0 &&
                state.posX <= state.numX &&
                state.posZ >= 0 &&
                state.posZ <= state.numZ &&
                state.wallLeft[state.posX + 1 + state.posZ * (state.numX + 1)]
              )
            ) {
              state.posX += 1;
            } else {
              state.lastMoveHitWall = true;
            }
            break;
          default:
          // console.log("Direction error: ", state.direction);
        }
      }
    },
    resetLastMoveHitWall: (state) => {
      state.lastMoveHitWall = false;
    },
    turnLeft: (state) => {
      if (state.currentAction === NOTHING) {
        state.currentAction = TURN_LEFT;
        state.direction = (state.direction + 1) % 4;
      }
    },
    turnRight: (state) => {
      if (state.currentAction === NOTHING) {
        state.currentAction = TURN_RIGHT;
        state.direction = (((state.direction - 1) % 4) + 4) % 4;
      }
    },
    resetCurrentAction: (state) => {
      state.currentAction = MOVE_FORWARD;
      state.actionCache = CACHE_UNUSED;
    },
    assignResetEvent: (state, action) => {
      state.resetEvent = action.payload;
    },
    popEvent: (state) => {
      state.currentAction = NOTHING;
    },
    pauseAction: (state) => {
      if (state.currentAction !== INTERRUPTED) {
        state.actionCache = state.currentAction;
        state.currentAction = INTERRUPTED;
      }
    },
    resumeAction: (state) => {
      if (state.actionCache !== CACHE_UNUSED) {
        state.currentAction = state.actionCache;
        state.actionCache = CACHE_UNUSED;
      }
    },
    assignPosX: (state, action) => {
      state.posX = action.payload;
    },
    assignPosZ: (state, action) => {
      state.posZ = action.payload;
    },
    assignWallTop: (state, action) => {
      state.wallTop = action.payload;
    },
    assignWallLeft: (state, action) => {
      state.wallLeft = action.payload;
    },
    assignNumX: (state, action) => {
      state.numX = action.payload;
    },
    assignNumZ: (state, action) => {
      state.numZ = action.payload;
    },
    assignInit: (state, action) => {
      state.isInit = action.payload;
    },
    assignResetCamera: (state, action) => {
      state.isResetCamera = action.payload;
      if (!action.payload) {
        state.direction = UP;
      }
    },
    assignNumWalls: (state, action) => {
      state.numWalls = action.payload;
    },
  },
});

export const {
  moveForward,
  moveBackward,
  turnLeft,
  turnRight,
  resetLastMoveHitWall,
  popEvent,
  assignPosX,
  assignPosZ,
  assignWallTop,
  assignWallLeft,
  assignNumX,
  assignNumZ,
  assignInit,
  assignResetCamera,
  resetCurrentAction,
  assignResetEvent,
  pauseAction,
  resumeAction,
  assignNumWalls,
} = controlSlice.actions;

export const selectDirection = (state) => state.control.direction;
export const selectPosX = (state) => state.control.posX;
export const selectPosZ = (state) => state.control.posZ;
export const selectAction = (state) => state.control.currentAction;
export const selectIsInit = (state) => state.control.isInit;
export const selectWallTop = (state) => state.control.wallTop;
export const selectWallLeft = (state) => state.control.wallLeft;
export const selectNumX = (state) => state.control.numX;
export const selectNumZ = (state) => state.control.numZ;
export const selectLastMoveHitWall = (state) => state.control.lastMoveHitWall;
export const selectIsResetCamera = (state) => state.control.isResetCamera;
export const selectResetEvent = (state) => state.control.resetEvent;
export const selectNumWalls = (state) => state.control.numWalls;

export default controlSlice.reducer;
