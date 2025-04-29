import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { db } from "../../../db/in-memory.db";
import { Driver } from "../../types/driver";
import { driverInputDtoValidation } from "../../validation/driverInputDtoValidation";
import { driversRepository } from "../../repositories/drivers.repository";

export const createDriverHandler = (req: Request, res: Response) => {
  //1) создаем newDriver
  const newDriver: Driver = {
    id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleModel: req.body.vehicleModel,
    vehicleYear: req.body.vehicleYear,
    vehicleLicensePlate: req.body.vehicleLicensePlate,
    vehicleDescription: req.body.vehicleDescription,
    vehicleFeatures: req.body.vehicleFeatures,
    createdAt: new Date(),
  };

  //2) Добавляем newDriver в БД
  driversRepository.create(newDriver);

  //3) возвращаем ответ
  res.status(HttpStatus.Created).send(newDriver);
  return;
};
