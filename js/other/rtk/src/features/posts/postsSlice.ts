import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

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
  userId?: string;
}

const initialState: IPost[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    userId: "1",
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    userId: "2",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.push(action.payload);
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
      const existingPost = state.find((post) => post.id === id);
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
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
