import { createSlice } from '@reduxjs/toolkit'
import { getUserMsg } from '../../apis/user';

const user = createSlice({
  name: 'userModule',
  initialState: {
    userMsg: {},
    userList: ['QAQ'],
    userId: '0'
  },
  reducers: {
    setUserMsg(state, action) {
      state.userMsg = action.payload
      console.log('state.userMsg', state.userMsg);
    },
    setUserList(state, action) {
      state.userList = action.payload
      console.log('state.setUserList', state.userList);
    },
    setUserIDList(state, action) {
      state.userId = action.payload
      console.log('state.userId', state.userId);
    },
  }
})

export const getUserMsgAsync = () => async (dispatch) => {
  console.log(111, await getUserMsg());
}

// export const { changeCount } = cartSlice2.actions;
export const { setUserMsg, setUserList, setUserIDList } = user.actions;

export default user.reducer;