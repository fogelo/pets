export const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "16px",
    }}
  >
    Загрузка...
  </div>
);

/* 
Что происходит без hydrateFallbackElement:
Пользователь переходит на /boards
React начинает загружать код маршрута
Экран остается пустым пока код загружается
Пользователь видит белый экран или "мигание"
Что происходит с hydrateFallbackElement:
Пользователь переходает на /boards
Сразу показывается <LoadingFallback /> (индикатор загрузки)
React загружает код маршрута в фоне
После загрузки показывается реальный компонент


Пользователь переходит на /boards
         ↓
hydrateFallbackElement показывается СРАЗУ
         ↓
lazy() начинает загрузку модуля
         ↓ (асинхронно)
Модуль загружен
         ↓
hydrateFallbackElement заменяется на реальный компонент

Hydrate — относится к процессу гидратации React
Fallback — "запасной вариант", что показать ПОКА основной контент загружается
Element — React элемент для отображения
*/
