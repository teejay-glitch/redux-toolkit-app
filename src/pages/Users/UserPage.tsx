import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../app/store/store";
import { selectAsyncUserById } from "../../app/features/usersAsync/userAsyncSlice";
import { Post } from "../../models/Post";
import { selectAllAsyncPosts, selectPostsAsyncByUser } from "../../app/features/postsAsync/postAsyncSlice";

const UserPage: React.FC = () => {
  const { userId } = useParams();
  const user = useSelector((state: RootState) => selectAsyncUserById(state, userId));

  // with this method if there is a change in postsAsyncSlice, this will get triggered which not requried

  // const postsForUser = useSelector((state: RootState) => {
  //   const allPosts = selectAllAsyncPosts(state);
  //   return allPosts.filter((post: Post) => post.userId.toString() === userId);
  // });

  //therefore to optimize performance, we can introduce memoized way of handling
  // this will only get triggered if there is a change in the userId or selectAllPostsAsync as defined within the function
  const postsForUser = useSelector((state: RootState) => {
    return selectPostsAsyncByUser(state, userId);
  });

  const postTitles = postsForUser.map((post: Post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    );
  });

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
