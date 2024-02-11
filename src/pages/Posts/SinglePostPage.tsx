import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../../app/features/postsAsync/postAsyncSlice";
import { RootState } from "../../app/store/store";
import Author from "./Author";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link, useParams } from "react-router-dom";

const SinglePostPage: React.FC = () => {
  const { postId } = useParams();
  const post = useSelector((state: RootState) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit</Link>
        <Author authorId={post.userId} />
        <TimeAgo time={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
