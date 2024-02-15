import { PayloadAction, createSlice, nanoid, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { Post, PostRequest, PostsResponse, Reaction } from "../../../models/Post";
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

const postsAdapter = createEntityAdapter({
  sortComparer: (a: Post, b: Post) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: "",
  count: 0,
});

// const initialState: PostsResponse = {
//   posts: [],
//   status: "idle",
//   error: null,
//   count: 0,
// };

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (error: any) {
    return error?.message;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost: PostRequest) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  } catch (error: any) {
    return error?.message;
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost: PostRequest) => {
  const { id } = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  } catch (error: any) {
    // return error?.message;
    return initialPost; // only for testing redux
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost: PostRequest) => {
  const { id } = initialPost;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status} : ${response.statusText}`;
  } catch (error: any) {
    return error.message;
  }
});

const postAsyncSlice = createSlice({
  name: "postsAsync",
  initialState,
  reducers: {
    reactionAddedAsync(state, action: PayloadAction<ReactionAction>) {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];

      if (post) {
        post.reactions[reaction as keyof Reaction]++;
      }
    },
    increaseCount(state) {
      state.count = state.count + 1;
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
        const loadedPosts = action.payload.map((post: Post) => {
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

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error in API";
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

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }

        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: selectAllAsyncPosts,
  selectById: selectAsyncPostById,
  selectIds: selectPostsAsyncIds,
} = postsAdapter.getSelectors((state: RootState) => state.postsAsync);

export const getPostsStatus = (state: RootState) => state.postsAsync.status;
export const getPostsError = (state: RootState) => state.postsAsync.error;
export const getCounter = (state: RootState) => state.postsAsync.count;

export const selectPostsAsyncByUser = createSelector(
  [selectAllAsyncPosts, (state, userId: string | undefined) => userId],
  (posts, userId) => posts.filter((post: Post) => post.userId.toString() === userId)
);

export const { reactionAddedAsync, increaseCount } = postAsyncSlice.actions;

export default postAsyncSlice.reducer;
