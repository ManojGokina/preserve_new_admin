import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: {
    username: string;
    firstname: string;
    lastname: string;
    passcode: string;
    email: string;
    phone: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://82.197.95.187:3011/api/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;