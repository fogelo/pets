import { useParams } from "react-router-dom";

export default function BoardPage() {
  const { boardId } = useParams();
  
  return (
    <div>
      <h1>Доска {boardId}</h1>
      <p>Содержимое доски</p>
    </div>
  );
}

export const Component = BoardPage; 