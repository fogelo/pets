import { NextFunction, Request, Response } from "express";
import { requestLogsCollection } from "../../db/db";
import { Filter } from "mongodb";
import { RequestLog } from "../types/request-log";
import { AUTH_PATH } from "../paths/paths";
import { HttpStatus } from "../types/http-statuses";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "qwerty";

export const requestLogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestLog = {
    ip: req.ip!,
    url: req.originalUrl,
    date: new Date(),
  };
  await requestLogsCollection.insertOne(requestLog);

  const tenSecondsAgo = new Date(Date.now() - 10_000);

  const filter: Filter<RequestLog> = {
    ip: requestLog.ip,
    url: requestLog.url,
    date: { $gte: tenSecondsAgo },
  };

  const totalCount = await requestLogsCollection.countDocuments(filter);
  if (totalCount > 5) {
    console.warn(`предупреждение слишком много запросов на: ${requestLog.url}`);
    if (requestLog.url === AUTH_PATH + "/login") {
      res.sendStatus(429);
      return;
    }
    if (requestLog.url === AUTH_PATH + "/registration") {
      res.sendStatus(429);
      return;
    }
    if (requestLog.url === AUTH_PATH + "/registration-confirmation") {
      res.sendStatus(429);
      return;
    }
    if (requestLog.url === AUTH_PATH + "/registration-email-resending") {
      res.sendStatus(429);
      return;
    }
  }
  next();
};
