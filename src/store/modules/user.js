import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'userModule',
  initialState: {
    name: '123'
  },
  reducers: {

  }
})

// export const { changeCount } = cartSlice2.actions;

export default user.reducer;