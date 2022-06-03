import { createSlice, createAsyncThunk, createAction, createReducer } from '@reduxjs/toolkit';
import { AiFillRightSquare } from 'react-icons/ai';
import { io } from 'socket.io-client';

export const DEFAULT_ROOM_ID = 'Hello World';

export const ACTION = {
  ON: {
    MESSAGE: 'room/ON/MESSAGE', // return Message
    JOIN: 'room/ON/JOIN', // return Room Infomation
    LEAVE: 'room/ON/LEAVE', // Return Room Information
    GAME_START: 'room/ON/GAME_START', // Return Room Information with Game Information
    CONNECT: 'room/ON/CONNECT', // return null
    CREATE_ROOM: 'room/ON/CREATE_ROOM',
    ON: 'room/ON', // return null
  },
  EMIT: {
    MESSAGE: 'room/EMIT/MESSAGE',
    JOIN: 'room/EMIT/JOIN',
    LEAVE: 'room/EMIT/LEAVE',
    GAME_START: 'room/EMIT/GAME_START',
    CREATE_ROOM: 'room/EMIT/CREATE_ROOM',
  },
  JOIN: 'room/JOIN',
  LEAVE: 'room/LEAVE',
  CREATE: 'room/CREATE',
}

/**
 * @typedef {{
 * message: string[],
 * users: string[],
 * id: string,
 * nmae: string,
 * status: 'playing' | 'waiting' | null,
 * }} Room
 * 
 */


/** @type {Room} */
const initialState = {
  message: [],
  users: [],
  id: '',
  name: '',
  status: null,
}


export const connect = createAsyncThunk(ACTION.ON.CONNECT, (arg, { extra }) => {
  const { service } = extra;
  return service.socketService.onConnect();
})

// export const on = createAsyncThunk(ACTION.ON.ON, (arg, { extra, getState }) => {
//   const { service } = extra;
//   const { auth } = getState();
//   if (auth.isLogin) {
//     service.socketService.setAuth({ auth });
//   }
//   service.socketService.on();
//   return Promise.resolve();
// });

export const emitMessage = createAsyncThunk(ACTION.EMIT.MESSAGE, (arg, { extra, getState }) => {
  const { service } = extra;
  const { username } = getState().auth?.profile;
  const { id } = getState().room;
  return service.socketService.emitMessage({ username, roomId: id, message: arg });
});

export const emitJoin = createAsyncThunk(ACTION.EMIT.JOIN, ({ id: roomId }, { extra, getState }) => {
  const { service } = extra;
  const { username } = getState().auth?.profile;
  return service.socketService.emitJoin({ username, roomId });
});

export const emitLeave = createAsyncThunk(ACTION.EMIT.LEAVE, ({ id }, { extra, getState }) => {
  const { service } = extra;
  const { username } = getState().auth?.profile;
  return service.socketService.emitLeave({ roomId: id, username });
});

export const emitCreateRoom = createAsyncThunk(ACTION.EMIT.CREATE_ROOM, ({ name }, { extra, getState }) => {
  const { service } = extra;
  return service.socketService.emitCreateRoom({ name });
});


export const emitGameStart = createAsyncThunk(ACTION.EMIT.GAME_START, (arg, { extra, getState }) => {
  const { service } = extra;
  const { username } = getState().auth?.profile;
  const { id } = getState().room;
  return service.socketService.emitGameStart({ username, roomId: id });

});







const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    [ACTION.ON.MESSAGE]: (state, action) => {
      // console.log('action!! :', action.payload);
      return {
        ...state,
        message: [action.payload, ...state.message]
      }
    },
    // action palyload is Room Information
    [ACTION.ON.JOIN]: (state, action) => {
      const { room } = action.payload;
      console.log('reducer!!', room)
      return {
        ...state,
        ...room
      }
    },
    [ACTION.ON.LEAVE]: (state, action) => {
      return {
        ...state,
        users: state.users.filter(user => user !== action.payload.username),
      }
    }
    ,
    [ACTION.ON.CREATE_ROOM]: (state, action) => {
      return {
        ...state,
        ...action.payload.room
      }
    },
    [ACTION.ON.GAME_START]: (state, action) => {
      return {
        ...state,
        status: 'started', // true => 게임 시작 됨 , false = 기다리는 중 
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state, action) => {
      console.log('connect')
      state = {
        ...state,
      }
    }),
      builder.addCase(emitLeave.fulfilled, (state, action) => {
        return initialState
      })
  }
});



export const { actions } = roomSlice;
const { reducer } = roomSlice;
export default reducer;


