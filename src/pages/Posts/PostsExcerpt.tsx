import React from "react";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAsyncPostById } from "../../app/features/postsAsync/postAsyncSlice";
import { RootState } from "../../app/store/store";

type PostsExcerptProps = {
  postId: string;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ postId }: PostsExcerptProps) => {
  const post = useSelector((state: RootState) => selectAsyncPostById(state, postId));

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body?.substring(0, 75)}</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <Author authorId={post.userId} />
        <TimeAgo time={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
