import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "../../store/store";

interface IUser {
  id: string;
  name: string;
}

const initialState: { users: IUser[] } = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        // action.payload.forEach((newUser) => {
        //   if (!state.users.find((user) => user.id === newUser.id)) {
        //     state.users.push(newUser);
        //   }
        // });
      }
    );
  },
});

export const usersReducer = usersSlice.reducer;

// селекторы
export const selectUserById = (state: AppRootState, userId: string) => {
  return state.users.users.find((user) => user.id === userId);
};

// санки
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
});
