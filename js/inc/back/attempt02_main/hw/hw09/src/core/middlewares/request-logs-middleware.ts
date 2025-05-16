import { NextFunction, Request, Response } from "express";
import { requestLogsCollection } from "../../db/db";
import { Filter } from "mongodb";
import { RequestLog } from "../types/request-log";

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
    console.warn("warning: too requests");
  }
  next();
};
