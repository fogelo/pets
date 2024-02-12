import { useAppDispatch } from "../../store/store";
import { useAddReactionMutation } from "../api/apiSlice";
import { IPost, reactionAdded } from "./postsSlice";

interface IProps {
  post: IPost;
}

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post }: IProps) => {
  const dispatch = useAppDispatch();

  const [addReaction, { isLoading }] = useAddReactionMutation();

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          onClick={() => addReaction({ postId: post.id, reactionName: name })}
        >
          {emoji} {post.reactions[name]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
