import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import watchlistReducer from "./watchlistSlice";
// import notificationReducer from "./notificationSlice";
// import reviewReducer from "./reviewSlice";

const store = configureStore({
  reducer: {
    // user: userReducer,
    // watchlist: watchlistReducer,
    // notification: notificationReducer,
    // review: reviewReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
