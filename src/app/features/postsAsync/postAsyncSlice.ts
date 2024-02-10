import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
  isAction,
} from "@reduxjs/toolkit";
import {
  Post,
  PostRequest,
  PostsResponse,
  Reaction,
} from "../../../models/Post";
import { RootState } from "../../store/store";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface PrepareAction {
  payload: Post;
}

interface ReactionAction {
  postId: string;
  reaction: string;
}

const initialState: PostsResponse = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (error: any) {
    return error?.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: PostRequest) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error: any) {
      return error?.message;
    }
  }
);

const postAsyncSlice = createSlice({
  name: "postsAsync",
  initialState,
  reducers: {
    postAddedAsync: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: string): PrepareAction {
        const id = nanoid();
        return {
          payload: {
            id,
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAddedAsync(state, action: PayloadAction<ReactionAction>) {
      const { postId, reaction } = action.payload;
      console.log("postID : ", postId);
      console.log("reaction ", reaction);

      const post = state.posts.find((p: Post) => p.id === postId);

      if (post) {
        post.reactions[reaction as keyof Reaction]++;
      }
    },
  },
  // this hanldes the async requests
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "suceeded";

        let min = 1;
        const existingPostIds = new Set(state.posts.map((post) => post.id));
        const newPosts = action.payload
          .filter((newPost: Post) => {
            return !existingPostIds.has(newPost.id);
          })
          .map((post: Post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
            return post;
          });

        state.posts = state.posts.concat(newPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        console.log(action.payload);

        state.posts.push(action.payload);
      });
  },
});

export const selectAllAsyncPosts = (state: RootState) => state.postsAsync.posts;
export const getPostsStatus = (state: RootState) => state.postsAsync.status;
export const getPostsError = (state: RootState) => state.postsAsync.error;

export const { postAddedAsync, reactionAddedAsync } = postAsyncSlice.actions;

export default postAsyncSlice.reducer;
