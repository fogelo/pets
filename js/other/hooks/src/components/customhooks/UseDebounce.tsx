import { useEffect, useState } from "react";

const UseDebounce = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  //  а вот так с дебанусом
  const [filteredComments, setFilteredComments] = useState([]);

  //вот так будет без дебануса
  //   const filteredComments = comments.filter((c) => c.name.includes(search));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setComments([...res, ...res, ...res, ...res, ...res]);
      });
  }, []);

  useEffect(() => {
    setFilteredComments(
      comments.filter((c) => c.name.includes(debouncedSearch))
    );
  }, [comments, debouncedSearch]);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      console.log(e);
    });
  }, []);
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        style={{ position: "fixed", top: 0, left: 0 }}
      />
      {filteredComments.map((c, i) => (
        <div key={i}>{c.name}</div>
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
