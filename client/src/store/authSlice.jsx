import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Axios/Axios";


export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const res = await axiosInstance.get("/api/auth/profile", {
      withCredentials: true,
    });
    console.log('res',res)
     
    return res.data.loggedIn;
  } catch {
    return false;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    authLoading: true,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
  .addCase(checkAuth.pending, (state) => {
    state.authLoading = true;
  })
  .addCase(checkAuth.fulfilled, (state, action) => {
    state.isAuthenticated = action.payload;
    state.authLoading = false;
  })
  .addCase(checkAuth.rejected, (state) => {
    state.isAuthenticated = false;
    state.authLoading = false;
  });

  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
