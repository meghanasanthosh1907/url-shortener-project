import { createSlice } from '@reduxjs/toolkit';

// Helper to get the logged-in user's email
const getCurrentUserEmail = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.user?.email || "guest";
};

// Load URLs specific to the current user
const loadUserUrls = () => {
  const email = getCurrentUserEmail();
  const saved = JSON.parse(localStorage.getItem(`urls_${email}`));
  return saved || [];
};

const initialState = {
  urls: loadUserUrls(),
};

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    setUrls: (state, action) => {
      state.urls = action.payload;
      const email = getCurrentUserEmail();
      localStorage.setItem(`urls_${email}`, JSON.stringify(state.urls));
    },

    addUrl: (state, action) => {
      state.urls.push(action.payload);
      const email = getCurrentUserEmail();
      localStorage.setItem(`urls_${email}`, JSON.stringify(state.urls));
    },

    deleteUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url.id !== action.payload);
      const email = getCurrentUserEmail();
      localStorage.setItem(`urls_${email}`, JSON.stringify(state.urls));
    },

    updateUrl: (state, action) => {
      const index = state.urls.findIndex((url) => url.id === action.payload.id);
      if (index !== -1) {
        state.urls[index] = action.payload;
        const email = getCurrentUserEmail();
        localStorage.setItem(`urls_${email}`, JSON.stringify(state.urls));
      }
    },
  },
});

export const { setUrls, addUrl, deleteUrl, updateUrl } = urlSlice.actions;

export default urlSlice.reducer;

