import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'cart',
  initialState: {
    userInfo:null,
  },
  reducers: {
    setUserData(state, action) {
      const userInfo = action.payload;
      state.userInfo=userInfo
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
