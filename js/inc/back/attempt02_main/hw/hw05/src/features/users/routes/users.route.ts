import { Router } from "express";
import { createUserHandler } from "./handlers/create-user.handler";
import { deleteUserHandler } from "./handlers/delete-user.handler";
import { getUserListHandler } from "./handlers/get-user-list.handler";

export const usersRouter: Router = Router({});

usersRouter
  .get("", getUserListHandler)
  .post("", createUserHandler)
  .delete("/:id", deleteUserHandler);
