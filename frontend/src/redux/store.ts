import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import movieReducer from "../features/movie/movieSlice";
import actorReducer from "../features/actor/actorSlice";
import userReducer from "../features/user/userSlice";
import reviewReducer from "../features/review/reviewSlice";

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  movie: movieReducer,
  actor: actorReducer,
  user: userReducer,
  review: reviewReducer,
});

export const createStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = createStore();
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
