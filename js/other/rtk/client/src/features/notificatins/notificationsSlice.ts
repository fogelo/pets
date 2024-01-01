import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppRootState } from "../../store/store";

interface INotification {
  id: number;
  message: string;
  date: string;
  userId: string;
  isNew: boolean;
  read: boolean;
}

const notificationAdapter = createEntityAdapter<INotification>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = notificationAdapter.getInitialState;

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead: (state) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });
    });
  },
});

export const notificationsReducer = notificationsSlice.reducer;

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootState;
    const allNotification = selectAllNotifications(state);
    const [latestNotification] = allNotification;
    const latestTimeStamp = latestNotification ? latestNotification.date : "";
    const response = await fetch(
      `http://localhost:3000/notifications?since=${latestTimeStamp}`
    );
    const notifications = await response.json();
    return notifications;
  }
);

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors<AppRootState>(
    (state) => state.notifications
  );

export const { allNotificationsRead } = notificationsSlice.actions;
