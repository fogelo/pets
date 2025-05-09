import express from "express";
import { UserQueryInput } from "../input/user-query.input";
import { usersService } from "../../application/users.service";
import { mapToUserOutput } from "../mappers/map-to-user-output";

export const getUserListHandler = async (
  req: express.Request<{}, {}, {}, UserQueryInput>,
  res: express.Response
) => {
  const queryInput = req.query;
  const users = await usersService.findMany(queryInput);  
  const usersOutput = users.map(mapToUserOutput);
  res.status(201).json(usersOutput);
};
