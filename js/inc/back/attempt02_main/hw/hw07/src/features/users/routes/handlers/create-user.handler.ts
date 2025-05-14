import express from "express";
import { mapToUserResponse } from "../mappers/map-to-user-output";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";
import { usersService } from "../../domain/users.service";
import { RequestWithBody } from "../../../../core/types/request-type";
import { authService } from "../../../auth/application/auth.service";
import { CreateUserRequestDTO } from "../../types/create.user.request-dto";
import { CreateUserInputDTO } from "../../types/create.user.input-dto";

export const createUserHandler = async (
  req: RequestWithBody<CreateUserRequestDTO>,
  res: express.Response
) => {
  try {
    const { hash, salt } = await authService._generateHashAndSalt(req.body.password);

    const userInputDTO: CreateUserInputDTO = {
      email: req.body.email,
      login: req.body.login,
      passwordHash: hash,
      passwordSalt: salt,
    };

    const createdUserId = await usersService.create(userInputDTO);
    const createdUser = await usersService.findByIdOrFail(createdUserId);
    const userResponse = mapToUserResponse(createdUser);
    res.status(HttpStatus.Created).json(userResponse);
    return;
  } catch (err) {
    errorsHandler(err, res);
  }
};
