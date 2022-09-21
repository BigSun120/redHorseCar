import { createSlice } from '@reduxjs/toolkit'
import { getUserMsg, getUserMsgById } from '../../apis/user';

const user = createSlice({
  name: 'userModule',
  initialState: {
    userMsg: {},
    userList: ['QAQ'],
    userId: '0',
  },
  reducers: {
    setUserMsgById(state, action) {
      state.userMsg = action.payload;
      console.log('state.userMsg', state.userMsg);
    },
    setUserList(state, action) {
      state.userList = action.payload;
      console.log('state.setUserList', state.userList);
    },
    setUserMsg(state, action) {
      state.userId = action.payload;
      console.log('state.userId', state.userId);
    },
    // setUserIDList(state, action) {
    //   state.userId = action.payload;
    //   console.log('state.userId', state.userId);
    // },
  }
})

export const getUserMsgAsync = () => async (dispatch) => {
  console.log(111, await getUserMsg());
}

// export const getUserMsgByIdAsync = (id) => async (dispatch) => {
//   const data = await getUserMsgById(id)
//   console.log('getUserMsgByIdAsync', data);
// } 

export const {
  setUserMsg,
  setUserList,
  setUserIDList } = user.actions;

export default user.reducer;