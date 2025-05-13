import express from "express";
import { UserCreateInput } from "../input/create-user.input";
import { usersService } from "../../application/users.service";
import { mapToUserOutput } from "../mappers/map-to-user-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export const createUserHandler = async (
  req: express.Request<{}, {}, UserCreateInput>,
  res: express.Response
) => {
  try {
    const body = req.body;
    const createdUserId = await usersService.create(body);
    const createdUser = await usersService.findByIdOrFail(createdUserId);
    const userOutput = mapToUserOutput(createdUser);
    res.status(HttpStatus.Created).json(userOutput);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
