import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppRootState } from "../../store/store";

interface IUser {
  id: string;
  name: string;
}

const usersAdapter = createEntityAdapter<IUser>();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        usersAdapter.setAll(state, action.payload);
      }
    );
  },
});

export const usersReducer = usersSlice.reducer;

// селекторы
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<AppRootState>((state) => state.users);

// санки
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
});
