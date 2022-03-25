import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import movieReducer from './movieSlice';
//import userReducer from './watchlistSlice';


const store = configureStore({
    reducer: {
      users: userReducer,
      movies:movieReducer,
      //watchlist:watchlistReducer,
    },
  })

  export default store;
  
  //// Infer the `RootState` and `AppDispatch` types from the store itself
  //export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  //export type AppDispatch = typeof store.dispatch