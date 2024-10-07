
import { RegisterState } from '@/interfaces/RegisterState.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RegisterState = {
  username: '',
  email: '',
  password: '',
  error: null,
  success: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
    },
    resetForm(state) {
      state.username = '';
      state.email = '';
      state.password = '';
      state.error = null;
      state.success = null;
    },
  },
});

export const { setUsername, setEmail, setPassword, setError, setSuccess, resetForm } = registerSlice.actions;

export default registerSlice.reducer;
