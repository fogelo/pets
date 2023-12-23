import { useAppSelector } from "../../store/store";

interface IProps {
  userId: string | undefined;
}

const PostAuthor = ({ userId }: IProps) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );
  return <span>{author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
