import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;