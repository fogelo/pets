import express, { Response } from "express";
import {
  body,
  query,
  validationResult,
  ValidationError,
} from "express-validator";
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
import {
  ICourse,
  IDb,
  coursesRepository,
} from "../db_repositories(dal)/courses_repository";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";

const getCourseViewModel = (dbCourse: ICourse): CourseViewModel => ({
  id: dbCourse.id,
  title: dbCourse.title,
});

const titleValidation = body("title")
  .trim()
  .isString()
  .notEmpty()
  .withMessage("title должен быть заполнен");

export const getCoursesRouter = () => {
  // создание роута
  const router = express.Router();

  //конфигурация роутера
  router.get(
    "/",
    async (
      req: RequestWithQuery<QueryCourseModel>,
      res: Response<CourseViewModel[]>
    ) => {
      const coursesPromise = coursesRepository.findCourses();
      const courses = await coursesPromise;
      res.status(HTTP_STATUSES.OK_200);
      res.json(courses.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id",
    async (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const course = await coursesRepository.findCourseById(req.params.id);
      if (course) res.json({ id: course.id, title: course.title });
      else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  );

  // post
  router.post(
    "/",
    titleValidation,
    inputValidationMiddleware,
    async (
      req: RequestWithBody<CreateCourseModel>,
      res: Response<CourseViewModel | ValidationError[]>
    ) => {
      const newCourse = await coursesRepository.createCourse(req.body.title);
      res.status(HTTP_STATUSES.CREATED_201);
      res.json({
        id: newCourse.id,
        title: newCourse.title,
      });
    }
  );

  // delete
  router.delete(
    "/:id",
    async (
      req: RequestWithParams<URIParamsCourseIdModel>,
      res: Response<CourseViewModel>
    ) => {
      const isDeleted = await coursesRepository.deleteCourse(req.params.id);
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
    titleValidation,
    inputValidationMiddleware,
    async (
      req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const isUpdated = await coursesRepository.updateCourse(
        req.params.id,
        req.body.title
      );
      if (isUpdated) {
        const updatedCourse = await coursesRepository.findCourseById(
          req.params.id
        );
        if (updatedCourse) {
          res.json({ id: updatedCourse?.id, title: updatedCourse?.title });
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
