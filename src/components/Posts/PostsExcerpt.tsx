import React from "react";
import { Post } from "../../models/Post";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

type PostsExcerptProps = {
  post: Post;
};

const PostsExcerpt: React.FC<PostsExcerptProps> = ({
  post,
}: PostsExcerptProps) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body?.substring(0, 100)}</p>
      <p className="postCredit">
        <Author authorId={post.userId} />
        <TimeAgo time={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
