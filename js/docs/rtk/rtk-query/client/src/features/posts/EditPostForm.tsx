import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postUpdated, selectPostById } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const EditPostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  /*  */
  const post = useAppSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      );
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <form>
      <h2>Edit Post</h2>
      <label htmlFor="title">Post Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="content">Post Content:</label>
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </form>
  );
};

export default EditPostForm;
