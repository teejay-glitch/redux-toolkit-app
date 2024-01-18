import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../app/features/posts/postSlice";
import Author from "./Author";
import { Post } from "../../models/Post";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList: React.FC = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a: Post, b: Post) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post: Post, index: number) => {
    return (
      <article key={index}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <p className="postCredit">
          <Author authorId={post.userId} />
          <TimeAgo time={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    );
  });

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
