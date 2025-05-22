// optionalAuthMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../features/auth/application/jwt.service";
import { usersService } from "../../features/users/domain/users.service";
import { mapToUserResponse } from "../../features/users/routes/mappers/map-to-user-output";

// // Расширение типа Request из Express для добавления опционального поля user
// declare global {
//   namespace Express {
//     interface Request {
//       user?: any; // Используем any для простоты, можно заменить на конкретный тип UserResponse
//     }
//   }
// }

export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Если заголовка нет или он не в формате Bearer, просто идем дальше
    return next();
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    // Если токен пустой после "Bearer ", идем дальше
    return next();
  }

  try {
    const userIdFromToken = await jwtService.getUserIdByAccessToken(accessToken);

    if (userIdFromToken) {
      const user = await usersService.findById(userIdFromToken.toString()); // Используем findById вместо findByIdOrFail
      if (user) {
        req.user = mapToUserResponse(user); // Устанавливаем req.user
      }
    }
  } catch (error) {
    // В случае любой ошибки при проверке токена (например, просрочен, невалиден),
    // мы не прерываем запрос, а просто идем дальше.
    // Ошибки логировать тут не будем, чтобы не засорять вывод для валидных анонимных запросов.
  }

  next(); // Передаем управление следующему middleware или обработчику
};