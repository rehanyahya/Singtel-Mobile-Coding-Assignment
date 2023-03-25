import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setLeaderboardData: (_, action) => action.payload,
  },
});

export const {setLeaderboardData} = userSlice.actions;

export default userSlice.reducer;
