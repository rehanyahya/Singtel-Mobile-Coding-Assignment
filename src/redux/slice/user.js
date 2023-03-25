import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    score: 0,
    email: '',
    uid: '',
  },
  reducers: {
    setUserScore: (state, action) => {
      state.score += action.payload;
    },
    setUserLoginData: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    setIsUserLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const {setUserScore, setUserLoginData, setIsUserLogin} =
  userSlice.actions;

export default userSlice.reducer;
