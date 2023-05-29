import { createSlice } from "@reduxjs/toolkit";

const userState = {
  isLogged: false,
  user: {},
  profile: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token",action.payload.accessToken);
      return { isLogged: true, user: action.payload };
    },
    logout: (state) => {
      localStorage.removeItem('token');
      return userState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
