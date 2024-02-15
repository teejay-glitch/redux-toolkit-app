import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store/store";
import { updatePost, deletePost, selectAsyncPostById } from "../../app/features/postsAsync/postAsyncSlice";
import { selectAllAsyncUsers } from "../../app/features/usersAsync/userAsyncSlice";
import { PostRequest } from "../../models/Post";
import { User } from "../../models/User";

const EditPostForm: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state: RootState) => selectAsyncPostById(state, postId || "1"));
  const users = useSelector(selectAllAsyncUsers);

  const [title, setTitle] = useState<string>(post?.title || "");
  const [content, setContent] = useState<string>(post?.body || "");
  const [userId, setUserId] = useState<string>(post?.userId || "1");
  const [requestStatus, setRequestStatus] = useState<string>("idle");

  const dispatch = useDispatch<AppDispatch>();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onAuthorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setUserId(e.currentTarget.value);
  };

  const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        const postRequest: PostRequest = {
          id: post.id,
          title: title,
          body: content,
          userId: userId,
          reactions: post.reactions,
        };
        dispatch(updatePost(postRequest)).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to update the post ", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const userOptions = () => {
    return users.map((user: User) => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      const postRequest: PostRequest = {
        id: post.id,
        title: title,
        body: content,
        userId: userId,
        reactions: post.reactions,
      };
      dispatch(deletePost(postRequest)).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post ", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => onTitleChange(e)} />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={(e) => onAuthorChange(e)}>
          {userOptions()}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={(e) => onContentChange(e)} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
