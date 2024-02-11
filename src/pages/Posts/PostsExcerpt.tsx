import React from "react";
import { Post } from "../../models/Post";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

type PostsExcerptProps = {
  post: Post;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }: PostsExcerptProps) => {
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
