import { ChangeEvent, useState } from "react";
import { postAdded } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  return (
    <form>
      <h2>Add a New Post</h2>
      <label htmlFor="title">Post Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor="content">Post Content:</label>
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={onContentChanged}
      />
      <label htmlFor="postAuthor"></label>
      <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
        <option value=""></option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Add Post
      </button>
    </form>
  );
};

export default AddPostForm;
