import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userVideo: null,
  userPlaylist: null,
  userTweets: null,
  userLikedVideos: null,
  userHistory: null,
  userSubscribed: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addUserVideo: (state, action) => {
      state.userVideo = action.payload;
    },
    addUserPlaylist: (state, action) => {
      state.userPlaylist = action.payload;
    },
    addUserTweets: (state, action) => {
      state.action = action.payload;
    },
    addUserLikedVideos: (state, action) => {
      state.userLikedVideos = action.payload;
    },
    addUserHistory: (state, action) => {
      state.userHistory = action.payload;
    },
    addUserSubscribed: (state, action) => {
      state.userSubscribed = action.payload;
    },
    // channels property is added to userSubscribed object
    toggleUserSubscribe: (state, action) => {
      state.userSubscribed.channels = state.userSubscribed.channles.map(
        (profile) =>
          profile._id === action.payload.profileId
            ? {
                ...profile,
                isSubscribed: action.payload.isSubscribed,
                subscribersCount: action.payload.subscribersCount,
              }
            : profile
      );
    },
  },
});
export const {
  addUser,
  addUserVideo,
  addUserPlaylist,
  addUserTweets,
  addUserLikedVideos,
  addUserHistory,
  addUserSubscribed,
  toggleUserSubscribe,
} = userSlice.actions;

export default userSlice.reducer;
