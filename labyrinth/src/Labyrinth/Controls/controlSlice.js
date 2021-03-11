import { createSlice } from '@reduxjs/toolkit';

export const MOVE_FORWARD = 0;
export const TURN_LEFT = 2;
export const TURN_RIGHT = 1;
export const MOVE_BACKWARD = 3;
export const NOTHING = 4;
export const UNINIT = -1;
export const UP = 0;
export const RIGHT = 3;
export const DOWN = 2;
export const LEFT = 1;

export const controlSlice = createSlice({
  name: 'control',
  initialState: {
    direction: 0,
    posX: UNINIT,
    posZ: UNINIT,
    // Used to block a new action when an action is exectuting
    currentAction: MOVE_FORWARD,
  },
  reducers: {
    moveForward: state => {
      if (state.currentAction === NOTHING) {
        state.currentAction = MOVE_FORWARD;
        switch (state.direction) {
          case UP: state.posZ -= 1;
            break;
          case RIGHT:
            state.posX += 1;
            break;
          case DOWN:
            state.posZ += 1;
            break;
          case LEFT:
            state.posX -= 1;
            break;
          default:
            console.log("Direction error: ", state.direction);
        }
      }
    },
    moveBackward: state => {
      if (state.currentAction === NOTHING) {
        state.currentAction = MOVE_BACKWARD;
        switch (state.direction) {
          case UP: state.posZ += 1;
            break;
          case RIGHT:
            state.posX -= 1;
            break;
          case DOWN:
            state.posZ -= 1;
            break;
          case LEFT:
            state.posX += 1;
            break;
          default:
            console.log("Direction error: ", state.direction);
        }
      }
    },
    turnLeft: state => {
      if (state.currentAction === NOTHING) {
        state.currentAction = TURN_LEFT;
        state.direction = (state.direction + 1) % 4;
      }
    },
    turnRight: state => {
      if (state.currentAction === NOTHING) {
        state.currentAction = TURN_RIGHT;
        state.direction = ((state.direction - 1) % 4 + 4) % 4;
      }
    },
    popEvent: state => {
      state.currentAction = NOTHING;
    },
    assignPosX: (state, action) => {
      state.posX = action.payload;
    },
    assignPosZ: (state, action) => {
      state.posZ = action.payload;
    }

  },
});


export const { moveForward, moveBackward, turnLeft, turnRight, popEvent, assignPosX, assignPosZ } = controlSlice.actions;

export const selectDirection = state => state.control.direction;
export const selectPosX = state => state.control.posX;
export const selectPosZ = state => state.control.posZ;
export const selectAction = state => state.control.currentAction;


export default controlSlice.reducer;
