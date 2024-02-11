import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../../models/Post";
import { selectAllAsyncPosts, getPostsStatus, getPostsError } from "../../app/features/postsAsync/postAsyncSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList: React.FC = () => {
  const posts = useSelector(selectAllAsyncPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content = null;

  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "suceeded") {
    const orderedPosts = posts.slice().sort((a: Post, b: Post) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: Post, index: number) => {
      return <PostsExcerpt key={index} post={post} />;
    });
  } else {
    content = <p>{postsError}</p>;
  }

  return <section>{content}</section>;
};

export default PostList;
