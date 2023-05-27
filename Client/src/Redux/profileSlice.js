import { createSlice } from "@reduxjs/toolkit";

const profileState = {
  profile: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState: profileState,
  reducers: {
    profileDetails: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { profileDetails } = profileSlice.actions;
export default profileSlice.reducer;
