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
import { coursesRepository } from "./course.repository";

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
      const dbCourses = coursesRepository.findCourses(title);
      const courses: ViewCourseModel[] = dbCourses.map(mapCourseToViewModel);
      res.json(courses);
      return;
    }
  )
  .get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseModel>,
      res: Response<ViewCourseModel | void>
    ) => {
      const id = +req.params.id;
      const course = coursesRepository.findCourseById(id);
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
    const newCourse: CreateCourseModel = {
      title: req.body.title || "unknown",
    };
    coursesRepository.createCourse(newCourse);
    res.status(201).json();
  })
  .put(
    "/:id",
    (
      req: RequestWithParamsAndBody<URIParamsCourseModel, UpdateCourseModel>,
      res
    ) => {
      const id = +req.params.id;
      const title = req.body.title;

      if (!title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const isCourseUpdated = coursesRepository.updateCourse(id, title);
      if (!isCourseUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }
      res.sendStatus(HTTP_STATUSES.OK_200);
    }
  )
  .delete("/:id", (req: RequestWithParams<URIParamsCourseModel>, res) => {
    const id = +req.params.id;
    const isCourseDeleted = coursesRepository.deleteCourse(id);
    if (!isCourseDeleted) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  });
