import { useGetUserQuery } from "../api/usersSlice";

interface IProps {
  userId: string;
}

const PostAuthor = ({ userId }: IProps) => {
  const {
    data: author,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserQuery(userId);

  return <span>{author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
