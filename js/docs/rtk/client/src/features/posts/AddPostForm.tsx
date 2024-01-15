import { ChangeEvent, useState } from "react";
import { addNewPost, postAdded } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewPost({ title, content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Ошибка при добавлении поста", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

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
