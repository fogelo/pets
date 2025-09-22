import { useEffect, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
// Хук для получения
const useUserPosts = ({ userId }: { userId: number }) => {
  const [data, setData] = useState<Post[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        console.log("finally");
        setLoading(false);
      }
    })();
  }, [userId]);

  return { data, error, loading };
};

export default useUserPosts;

/* 
- Использование нескольких setState само по себе не означает, что каждый вызов сеттера (setData, setError и т.д.) немедленно вызовет ререндер. React умеет "батчить" (группировать) обновления состояния, особенно в React 18. Однако, когда обновления состояния разделены асинхронными операциями (как await), они обычно вызывают отдельные ререндеры.
*/
