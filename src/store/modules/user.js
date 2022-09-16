import { createSlice } from '@reduxjs/toolkit'
import { getUserMsg } from '../../apis/user';

const user = createSlice({
  name: 'userModule',
  initialState: {
    userMsg: {}
  },
  reducers: {
    setUserMsg(state, action) {
      state.userMsg = action.payload
      console.log('state.userMsg', state.userMsg);
    },
  }
})

export const getUserMsgAsync = () => async (dispatch) => {
  console.log(111, await getUserMsg());
}

// export const { changeCount } = cartSlice2.actions;
export const { setUserMsg } = user.actions;


export default user.reducer;