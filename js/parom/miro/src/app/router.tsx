import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { ROUTES } from "../shared/routes";
import { LoadingFallback } from "../shared/components/LoadingFallback";

/* 
code splitting - разделение кода на части
lazy - загрузка компонента асинхронно
hydrateFallbackElement - элемент для отображения ПОКА загружается основной компонент

Для каждой страницы будет свой js файл


*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect(ROUTES.BOARDS),
      },
      {
        path: ROUTES.BOARDS,
        lazy: () => import("@/features/boards-list/boards-list.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
      {
        path: ROUTES.FAVORITE_BOARDS,
        lazy: () =>
          import("@/features/boards-list/boards-list-favorite.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
      {
        path: ROUTES.RECENT_BOARDS,
        lazy: () =>
          import("@/features/boards-list/boards-list-recent.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
      {
        path: ROUTES.BOARD,
        lazy: () => import("@/features/board/board.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
        hydrateFallbackElement: <LoadingFallback />,
      },
    ],
  },
]);
