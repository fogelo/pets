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
import { HTTP_STATUSES } from "../utils";
import { ICourse, coursesRepository } from "../db_repositories(dal)/courses_repository";

const getCourseViewModel = (dbCourse: ICourse): CourseViewModel => ({
  id: dbCourse.id,
  title: dbCourse.title,
});

export const getCoursesRouter = () => {
  // создание роута
  const router = express.Router();

  //конфигурация роутера
  router.get(
    "/",
    (
      req: RequestWithQuery<QueryCourseModel>,
      res: Response<CourseViewModel[]>
    ) => {
      const courses = coursesRepository.findCourses().map(getCourseViewModel);
      res.status(HTTP_STATUSES.OK_200);
      res.json(courses);
    }
  );

  router.get(
    "/:id",
    (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const course = coursesRepository.findCourseById(req.params.id);
      if (course) res.json({ id: course.id, title: course.title });
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
        const newCourse = coursesRepository.createCourse(title);
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
      const isDeleted = coursesRepository.deleteCourse(req.params.id);
      if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.OK_200);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
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
        const isUpdated = coursesRepository.updateCourse(req.params.id, title);
        if (isUpdated) {
          const updatedCourse = coursesRepository.findCourseById(req.params.id);
          res.json(updatedCourse);
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
