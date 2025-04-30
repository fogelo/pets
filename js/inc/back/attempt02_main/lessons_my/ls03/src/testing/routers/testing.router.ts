import { Request, Response, Router } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { db } from "../../db/in-memory.db";

export const testingRouter = Router({});

// эндпоинт для работы в тестовом режиме, удаляет данные из бд
testingRouter.delete("/all-data", (req: Request, res: Response) => {
  db.drivers = [];
  res.sendStatus(HttpStatus.NoContent);
});
