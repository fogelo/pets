import { useAppSelector } from "../../store/store";
import { selectUserById } from "../users/usersSlice";

interface IProps {
  userId: string;
}

const PostAuthor = ({ userId }: IProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId));
  return <span>{author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
