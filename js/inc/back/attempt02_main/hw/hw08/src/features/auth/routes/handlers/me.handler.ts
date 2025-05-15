import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";

export const meHandler = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    res.status(HttpStatus.Ok).send({
      email: user.email,
      login: user.login,
      userId: user.id,
    });
  } else {
    res.sendStatus(HttpStatus.Unauthorized);
  }
};
