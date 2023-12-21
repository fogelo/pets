import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface CounterState {
  value: number;
}
const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state, action: PayloadAction<{ value: number }>) => {
      state.value = state.value + action.payload.value;
    },
    decremented: (state, action) => {
      state.value = state.value - action.payload.value;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // полезене при использовании санок
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
