import { Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { inputValidationMiddleware } from "../middlewares/input.validation.middleware";
import {
  Pagination,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
  Status,
} from "../models/common";
import { CreateUserInputModel } from "../models/input/user/create.user.input.model";
import { QueryUserInputModel } from "../models/input/user/query.user.input.model";
import { UserOutputModel } from "../models/output/user.output.model";
import { UserRepository } from "../repositories/user.repositoty";
import { userValidation } from "../validators/user.validators";
import { UserService } from "../services/user.service";
import { ObjectId } from "mongodb";

export const userRouter = Router();

userRouter.get(
  "/",
  async (
    req: RequestWithQuery<QueryUserInputModel>,
    res: Response<Pagination<UserOutputModel>>
  ) => {
    const sortData: Required<QueryUserInputModel> = {
      searchEmailTerm: req.query.searchEmailTerm || null,
      searchLoginTerm: req.query.searchLoginTerm || null,
      pageNumber: req.query.pageNumber || 1,
      pageSize: req.query.pageSize || 10,
      sortBy: req.query.sortBy || "createdAt",
      sortDirection: req.query.sortDirection || "desc",
    };

    const users = await UserRepository.getUsers(sortData);
    return res.status(Status.Ok_200).json(users);
  }
);

userRouter.post(
  "/",
  authMiddleware,
  userValidation(),
  inputValidationMiddleware,
  async (
    req: RequestWithBody<CreateUserInputModel>,
    res: Response<UserOutputModel>
  ) => {
    const { email, login, password } = req.body;
    const userData = {
      login,
      email,
      password,
    };

    const user = await UserService.createUser(userData);
    if (!user) {
      return res.sendStatus(Status.NotFound_404);
    }

    return res.status(Status.Created_201).json(user);
  }
);

userRouter.delete(
  "/:id",
  authMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    console.log(id);

    if (!ObjectId.isValid(id)) {
      res.sendStatus(Status.NotFound_404);
      return;
    }

    const existingUser = await UserRepository.getUserById(id);
    if (!existingUser) {
      return res.sendStatus(Status.NotFound_404);
    }
    const isDeleted = await UserRepository.deleteUser(id);
    if (!isDeleted) {
      res.sendStatus(Status.NotFound_404);
      return;
    }
    return res.sendStatus(Status.NoContent_204);
  }
);
