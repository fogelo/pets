import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { AppRootState } from "../../store/store";

export interface IPost {
  id: string;
  title: string;
  content: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  userId: string;
}

export enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = postsAdapter.getInitialState({
  status: RequestStatus.Idle,
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        postsAdapter.addOne(state, action.payload);
      },
      // Какая-то предварительная логика подготовки перед добавлением поста
      prepare(title: string, content: string, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof IPost["reactions"];
      }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.status = RequestStatus.Succeeded;
          postsAdapter.upsertMany(state, action.payload);
        }
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      });
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectTotal: selectPostTotal,
  selectEntities: selectPostEntities,
} = postsAdapter.getSelectors<AppRootState>((state) => state.posts);

// санки
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/posts", {
    method: "get",
  });
  const data = await response.json();
  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost: { title: string; content: string; userId: string }) => {
    const response = await fetch("http://localhost:3000/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    return data;
  }
);
