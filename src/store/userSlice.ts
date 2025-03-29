import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export type User = {
  username: string;
  firstname: string;
  lastname: string;
  passcode: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalcode: string;
};

export type UserState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  users: User[];
  usersCount: number;
};

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  users: [],
  usersCount: 0,
};

const BASE_URL = "http://82.197.95.187:3011/api"

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: {
    username: string;
    firstname: string;
    lastname: string;
    passcode: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    state: string;
    postalcode: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);


export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
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
      })

      // Fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
        state.usersCount = action.payload.count;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = [];
        state.usersCount = 0;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;