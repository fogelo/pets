import useData from "./hooks/useData";

const CustomHooks: React.FC = () => {
  const { data, error, loading } = useData();
  console.log(data, error, loading);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      {data?.map((post) => (
        <ul key={post.id}>
          <li>{post.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default CustomHooks;
