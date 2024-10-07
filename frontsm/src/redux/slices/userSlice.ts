import { UserState } from '@/interfaces/UserState.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  id: null,
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: number | null; token: string; user: any }>) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearUser(state) {
      state.id = null;
      state.token = null;
      state.user = null;
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;


export default userSlice.reducer;
