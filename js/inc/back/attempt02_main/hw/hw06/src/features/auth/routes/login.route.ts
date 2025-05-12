import { Router } from "express";
import { usersService } from "../../users/application/users.service";
import { HttpStatus } from "../../../core/types/http-statuses";
import { jwtService } from "../application/jwt.service";
import { authMiddleware } from "../auth.middleware";

export const authRouter: Router = Router({});

authRouter
  .get("/me", authMiddleware, async (req, res) => {
    const user = req.user;
    if (user) {
      res.status(HttpStatus.Ok).send(req.user);
    } else {
      res.sendStatus(HttpStatus.Unauthorized);
    }
  })
  .post("/login", async (req, res) => {
    const user = await usersService.checkCredentials(
      req.body.login,
      req.body.password
    );
    if (user) {
      const token = await jwtService.createJWT(user);
      res.status(HttpStatus.Created).send(token);
    } else {
      res.sendStatus(HttpStatus.Unauthorized);
    }
  });
