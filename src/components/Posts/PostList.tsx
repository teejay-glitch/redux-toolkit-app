import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../models/Post";
import {
  selectAllAsyncPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../../app/features/postsAsync/postAsyncSlice";
import { AppDispatch } from "../../app/store/store";
import PostsExcerpt from "./PostsExcerpt";

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllAsyncPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content = null;

  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "suceeded") {
    const orderedPosts = posts
      .slice()
      .sort((a: Post, b: Post) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: Post, index: number) => {
      return <PostsExcerpt key={index} post={post} />;
    });
  } else {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
