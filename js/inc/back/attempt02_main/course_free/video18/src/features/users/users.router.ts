import express, { Response, Router } from "express";
import { UserType, db } from "../../db/db";
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

export const usersRouter: Router = express.Router();

export const mapUserToViewModel = (user: UserType): ViewUserModel => {
  return { id: user.id, userName: user.userName };
};

usersRouter
  .get(
    "",
    (req: RequestWithQuery<QueryUserModel>, res: Response<ViewUserModel[]>) => {
      const userName = req.query.userName;
      if (userName) {
        const filteredDbUsers = db.users.filter((user) =>
          user.userName.includes(userName)
        );
        const users: ViewUserModel[] = filteredDbUsers.map(mapUserToViewModel);
        res.json(users);
        return;
      } else {
        const users: ViewUserModel[] = db.users.map(mapUserToViewModel);
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
      const user = db.users.find((user) => user.id === +req.params.id);
      if (!user) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.json(mapUserToViewModel(user));
        return;
      }
    }
  )
  .post("", (req: RequestWithBody<CreateUserModel>, res) => {
    const newUser: UserType = {
      id: +new Date(),
      userName: req.body.userName || "unknown",
    };

    db.users.push(newUser);
    res.status(201).json();
  })
  .put(
    "/:id",
    (
      req: RequestWithParamsAndBody<URIParamsUserModel, UpdateUserModel>,
      res
    ) => {
      const id = +req.params.id;
      const user = db.users.find((user) => user.id === id);
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
    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      db.users.splice(index, 1);
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  });
