import express, { Response } from "express";
import {
  RequestWithQuery,
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
} from "../../types";
import { CourseViewModel } from "../models/CourseViewModel";
import { CreateCourseModel } from "../models/CreateCourseModel";
import { QueryCourseModel } from "../models/QueryCourseModel";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import { UpdateCourseModel } from "../models/UpdateCourseModel";
import { ICourse, IDb } from "../db/db";
import { HTTP_STATUSES } from "../utils";

const getCourseViewModel = (dbCourse: ICourse): CourseViewModel => ({
  id: dbCourse.id,
  title: dbCourse.title,
});

export const getCoursesRouter = (db: IDb) => {
  // создание роута
  const router = express.Router();

  //конфигурация роутера
  router.get(
    "/",
    (
      req: RequestWithQuery<QueryCourseModel>,
      res: Response<CourseViewModel[]>
    ) => {
      res.status(HTTP_STATUSES.OK_200);
      res.json(db.courses.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const dbCourse = db.courses.find(
        (dbCourse) => dbCourse.id === req.params.id
      );
      if (dbCourse) res.json({ id: dbCourse.id, title: dbCourse.title });
      else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  );

  // post
  router.post(
    "/",
    (
      req: RequestWithBody<CreateCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const title = req.body.title;
      const isTitleCorrect = typeof title === "string";
      if (isTitleCorrect) {
        const newCourse: ICourse = {
          id: String(new Date()),
          title,
          studentCount: 0,
        };
        db.courses.push(newCourse);
        res.status(HTTP_STATUSES.CREATED_201);
        res.json({
          id: newCourse.id,
          title: newCourse.title,
        });
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      }
    }
  );

  // delete
  router.delete(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const course = db.courses.find((course) => course.id === req.params.id);
      db.courses = db.courses.filter((course) => course.id !== req.params.id);

      if (course) {
        res.status(HTTP_STATUSES.CREATED_201);
        res.json(course);
      }
    }
  );

  // put
  router.put(
    "/:id",
    (
      req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const title = req.body.title;
      if (title) {
        const course = db.courses.find((course) => course.id === req.params.id);
        if (course) {
          course.title = title;
          res.json(course);
        } else {
          res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        }
      } else {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      }
    }
  );
  return router;
};
