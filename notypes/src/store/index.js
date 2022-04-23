import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './userSlice';
import watchlistReducer from './watchlistSlice';
//import userReducer from './watchlistSlice';



const reducer = combineReducers({
  userReducer,
  watchlistReducer,
  //watchlistReducer,
})

const store = configureStore({
    reducer,
  })

  export default store;
  
  //// Infer the `RootState` and `AppDispatch` types from the store itself
  //export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  //export type AppDispatch = typeof store.dispatch