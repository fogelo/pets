import express, { Response, Router } from "express";
import { CourseType, db } from "../../db/db";
import { HTTP_STATUSES } from "../../http_statuses";
import { CreateCourseModel } from "./models/CreateCourseModel";
import { QueryCourseModel } from "./models/QueryCourseModel";
import { UpdateCourseModel } from "./models/UpdateCourseModel";
import { URIParamsCourseModel } from "./models/URIParamsCourseModel";
import { ViewCourseModel } from "./models/ViewCourseModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../../types";

export const coursesRouter: Router = express.Router();

export const mapCourseToViewModel = (course: CourseType): ViewCourseModel => {
  return { id: course.id, title: course.title };
};

coursesRouter
  .get(
    "",
    (
      req: RequestWithQuery<QueryCourseModel>,
      res: Response<ViewCourseModel[]>
    ) => {
      const title = req.query.title;
      if (title) {
        const filteredDbCourses = db.courses.filter((course) =>
          course.title.includes(title)
        );
        const courses: ViewCourseModel[] = filteredDbCourses.map(
          mapCourseToViewModel
        );
        res.json(courses);
        return;
      } else {
        const courses: ViewCourseModel[] = db.courses.map(
          mapCourseToViewModel
        );
        res.json(courses);
        return;
      }
    }
  )
  .get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseModel>,
      res: Response<ViewCourseModel | void>
    ) => {
      const course = db.courses.find((course) => course.id === +req.params.id);
      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.json(mapCourseToViewModel(course));
        return;
      }
    }
  )
  .post("", (req: RequestWithBody<CreateCourseModel>, res) => {
    const newCourse: CourseType = {
      id: +new Date(),
      title: req.body.title || "unknown",
      usersCount: 0,
    };

    db.courses.push(newCourse);
    res.status(201).json();
  })
  .put(
    "/:id",
    (
      req: RequestWithParamsAndBody<URIParamsCourseModel, UpdateCourseModel>,
      res
    ) => {
      const id = +req.params.id;
      const course = db.courses.find((course) => course.id === id);
      const title = req.body.title;

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }

      if (!title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      course.title = title;
      res.sendStatus(HTTP_STATUSES.OK_200);
    }
  )
  .delete("/:id", (req: RequestWithParams<URIParamsCourseModel>, res) => {
    const id = +req.params.id;
    const index = db.courses.findIndex((course) => course.id === id);
    if (index === -1) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      db.courses.splice(index, 1);
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  });
