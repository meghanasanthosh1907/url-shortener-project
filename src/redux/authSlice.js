import { createSlice } from "@reduxjs/toolkit";

const savedEmail = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth")).user.email
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedEmail ? { email: savedEmail } : null,
    isAuthenticated: !!savedEmail,
  },
  reducers: {
    login: (state, action) => {
      state.user = { email: action.payload };
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify({ user: { email: action.payload } }));
    },
    logout: (state) => {
      const email = state.user?.email;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth");
      localStorage.removeItem(`urls_${email}`); // ✅ Clear only current user URLs
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
