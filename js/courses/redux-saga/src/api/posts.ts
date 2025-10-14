const getPosts = () => {
  const response = fetch("https://jsonplaceholder.typicode.com/posts").then(
    (response) => response.json()
  );
  return response;
};

const getUserPosts = (userId: number) => {
  const response = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).then((response) => response.json());
  return response;
};

export { getPosts, getUserPosts };
