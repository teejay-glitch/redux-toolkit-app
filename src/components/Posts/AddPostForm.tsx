import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../../app/features/posts/postSlice";
import { selectAllUsers } from "../../app/features/posts/userSlice";
import { User } from "../../models/User";

const AddPostForm: React.FC = () => {
  const [title, seTtitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seTtitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onAuthorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setUserId(e.currentTarget.value);
  };

  const onSavePostClicked = () => {
    if (title && content) {
      //   dispatch(postAdded({ id: nanoid, title, content }));

      //this is the best approach of doing this
      dispatch(postAdded(title, content, userId));

      seTtitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = () => {
    return users.map((user: User) => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => onTitleChange(e)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" onChange={(e) => onAuthorChange(e)}>
          {userOptions()}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => onContentChange(e)}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
