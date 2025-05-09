import { Request, Response } from "express";
import { driversRepository } from "../../repositories/drivers.repository";

export async function getDriverListHandler(req: Request, res: Response) {
  const allDrivers = await driversRepository.findAll();
  res.send(allDrivers);
  return;
}
