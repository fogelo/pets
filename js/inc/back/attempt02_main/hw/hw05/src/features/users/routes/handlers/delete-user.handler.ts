import express from "express";
import { usersService } from "../../application/users.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const deleteUserHandler = async (
  req: express.Request<{ id: string }>,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    await usersService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (err: unknown) {
    errorsHandler(err, res)
  }
};
