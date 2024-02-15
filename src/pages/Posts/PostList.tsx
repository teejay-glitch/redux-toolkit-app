import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../../models/Post";
import { selectPostsAsyncIds, getPostsStatus, getPostsError } from "../../app/features/postsAsync/postAsyncSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList: React.FC = () => {
  const orderedPostsIds = useSelector(selectPostsAsyncIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content = null;

  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "suceeded") {
    content = orderedPostsIds.map((postId: string, index: number) => {
      return <PostsExcerpt key={index} postId={postId} />;
    });
  } else {
    content = <p>{postsError}</p>;
  }

  return <section>{content}</section>;
};

export default PostList;
