import express, { Response, Router } from "express";
import { dbInMemory } from "../../db/db-in-memory";
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

export const usersRouter: Router = express.Router();

export const mapDbUserToViewUserModel = (user: DbUserModel): ViewUserModel => {
  return { id: user.id, userName: user.userName };
};

usersRouter
  .get(
    "",
    (req: RequestWithQuery<QueryUserModel>, res: Response<ViewUserModel[]>) => {
      const userName = req.query.userName;
      if (userName) {
        const filteredDbUsers = dbInMemory.users.filter((user) =>
          user.userName.includes(userName)
        );
        const users: ViewUserModel[] = filteredDbUsers.map(mapDbUserToViewUserModel);
        res.json(users);
        return;
      } else {
        const users: ViewUserModel[] = dbInMemory.users.map(mapDbUserToViewUserModel);
        res.json(users);
        return;
      }
    }
  )
  .get(
    "/:id",
    (
      req: RequestWithParams<URIParamsUserModel>,
      res: Response<ViewUserModel | void>
    ) => {
      const user = dbInMemory.users.find((user) => user.id === +req.params.id);
      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.json(mapDbUserToViewUserModel(user));
        return;
      }
    }
  )
  .post("", (req: RequestWithBody<CreateUserModel>, res) => {
    const newUser: DbUserModel = {
      id: +new Date(),
      userName: req.body.userName || "unknown",
    };

    dbInMemory.users.push(newUser);
    res.status(201).json();
  })
  .put(
    "/:id",
    (
      req: RequestWithParamsAndBody<URIParamsUserModel, UpdateUserModel>,
      res
    ) => {
      const id = +req.params.id;
      const user = dbInMemory.users.find((user) => user.id === id);
      const userName = req.body.userName;

      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      if (!userName) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      user.userName = userName;
      res.sendStatus(HTTP_STATUSES.OK_200);
    }
  )
  .delete("/:id", (req: RequestWithParams<URIParamsUserModel>, res) => {
    const id = +req.params.id;
    const index = dbInMemory.users.findIndex((user) => user.id === id);
    if (index === -1) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      dbInMemory.users.splice(index, 1);
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  });
