import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Blog = {
  id: string;
  title: string;
};

interface BlogsResponse {
  items: Blog[];
}

const fetchBlogList = async (): Promise<BlogsResponse> => {
  const { data } = await axios.get<BlogsResponse>(
    "http://localhost/hometask_09/api/blogs"
  );
  return data;
};

const Blogs = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogList,
  });

  console.log(data);
  return (
    <>
      {data?.items.map((item) => (
        <div>{item.title}</div>
      ))}
    </>
  );
};

export default Blogs;
