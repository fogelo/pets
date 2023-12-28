import {
  PayloadAction,
  createAsyncThunk,
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

const initialState: { posts: IPost[]; status: RequestStatus } = {
  posts: [],
  status: RequestStatus.Idle,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === id);
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
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
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
          action.payload.forEach((newPost) => {
            if (!state.posts.find((post) => post.id === newPost.id)) {
              state.posts.push(newPost);
            }
          });
        }
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
      builder.addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

// селекторы
export const selectAllPosts = (state: AppRootState) => state.posts.posts;
export const selectPostById = (state: AppRootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

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
    console.log(JSON.stringify(newPost));

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
