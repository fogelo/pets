import { useEffect, useState } from "react";

const UseDebounce = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filteredComments, setFilteredComments] = useState([]);

  console.log(filteredComments);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setComments(res);
      });
  }, []);

  useEffect(() => {
    setFilteredComments(
      comments.filter((c) => c.name.includes(debouncedSearch))
    );
  }, [comments, debouncedSearch]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      {filteredComments.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </>
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return debouncedValue;
}

export default UseDebounce;
