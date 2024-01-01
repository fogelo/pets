import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterReducer from "../features/counter/counterSlice";
import { postsReducer } from "../features/posts/postsSlice";
import { usersReducer } from "../features/users/usersSlice";
import { notificationsReducer } from "../features/notificatins/notificationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // полезене при использовании санок
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
