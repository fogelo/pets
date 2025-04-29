import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { driverInputDtoValidation } from "../../validation/driverInputDtoValidation";
import { driversRepository } from "../../repositories/drivers.repository";

export const updateDriverHandler = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const driver = driversRepository.findById(id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: "id", message: "Driver not found" }])
      );
    return;
  }

  driversRepository.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
  return;
};
