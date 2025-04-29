import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { driversRepository } from "../../repositories/drivers.repository";

export const getDriverHandler = (req: Request, res: Response) => {
  // ищем водителя в бд по id
  const id = +req.params.id;
  const driver = driversRepository.findById(id);
  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: "id", message: "Driver not found" }])
      );
    return;
  }
  // возвращаем ответ
  res.status(HttpStatus.Ok).send(driver);
};
