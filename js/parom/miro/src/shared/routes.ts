import "react-router-dom";

// константы маршрутов
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOARDS: "/boards",
  BOARD: "/boards/:boardId",
  FAVORITE_BOARDS: "/boards/favorite",
  RECENT_BOARDS: "/boards/recent",
} as const;

// типы параметров маршрутов
/* 
Определяет типы для динамических параметров в маршрутах. 
В данном случае только маршрут BOARD имеет параметр boardId типа string.
*/
export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

/* 
Это расширение типов React Router DOM. 
Оно добавляет строгую типизацию для параметров маршрутов во всем приложении. 
Теперь при использовании хуков вроде useParams() в компоненте доски, 
TypeScript будет знать, что есть параметр boardId.
*/
declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
