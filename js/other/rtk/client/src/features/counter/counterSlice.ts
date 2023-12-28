import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    incrementByAmount: (state, action) => {
      state.value = state.value + action.payload.value;
    },
  },
});

// экшны
export const { incremented, decremented, incrementByAmount } =
  counterSlice.actions;

// санки
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export default counterSlice.reducer;
