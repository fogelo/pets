import express, { Response, Router } from "express";
import { HTTP_STATUSES } from "../../http_statuses";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../../types";
import { ViewUserModel } from "./models/ViewUserModel";
import { QueryUserModel } from "./models/QueryUserModel";
import { URIParamsUserModel } from "./models/URIParamsUserModel";
import { CreateUserModel } from "./models/CreateUserModel";
import { UpdateUserModel } from "./models/UpdateUserModel";
import { DbUserModel } from "./models/DbUserModel";
import { userService } from "./user.service";

export const usersRouter: Router = express.Router();

export const mapDbUserToViewUserModel = (user: DbUserModel): ViewUserModel => {
  return { id: user.id, userName: user.userName };
};

usersRouter
  .get(
    "",
    async (
      req: RequestWithQuery<QueryUserModel>,
      res: Response<ViewUserModel[]>
    ) => {
      const userName = req.query.userName;
      if (userName) {
        const filteredDbUsers = await userService.findUsers(userName);
        const users: ViewUserModel[] = filteredDbUsers.map(
          mapDbUserToViewUserModel
        );
        res.json(users);
        return;
      } else {
        const dbUsers = await userService.findUsers();
        const users: ViewUserModel[] = dbUsers.map(mapDbUserToViewUserModel);
        res.json(users);
        return;
      }
    }
  )
  .get(
    "/:id",
    async (
      req: RequestWithParams<URIParamsUserModel>,
      res: Response<ViewUserModel | void>
    ) => {
      const id = +req.params.id;
      const user = await userService.findUserById(id);
      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.json(mapDbUserToViewUserModel(user));
        return;
      }
    }
  )
  .post("", async (req: RequestWithBody<CreateUserModel>, res) => {
    const newUser: CreateUserModel = {
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
    };
    await userService.createUser(newUser);
    res.status(201).json();
  })
  .put(
    "/:id",
    async (
      req: RequestWithParamsAndBody<URIParamsUserModel, UpdateUserModel>,
      res
    ) => {
      const id = +req.params.id;
      const login = req.body.login;

      if (!login) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const user = await userService.findUserById(id);

      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      const isUpdated = await userService.updateUser(id, login);
      res.sendStatus(HTTP_STATUSES.OK_200);
    }
  )
  .delete("/:id", async (req: RequestWithParams<URIParamsUserModel>, res) => {
    const id = +req.params.id;
    const isDeleted = await userService.deleteUser(id);
    res.sendStatus(HTTP_STATUSES.OK_200);
  });
