import express, { Response, Router } from "express";
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
import { titleValidationMiddleware } from "./title-validation-middleware";
import { inputValidationMiddleware } from "../../middlewares/input-validation-middleware";
import { authorizationMiddleware } from "../../middlewares/authorization-middleware";
import { DbCourseModel } from "./models/DbCourseModel";
import { coursesService } from "./course.service";

export const coursesRouter: Router = express.Router();

export const mapDbCourseToViewCourseModel = (
  course: DbCourseModel
): ViewCourseModel => {
  return { id: course.id, title: course.title };
};

coursesRouter
  .get(
    "",
    async (
      req: RequestWithQuery<QueryCourseModel>,
      res: Response<ViewCourseModel[]>
    ) => {
      const title = req.query.title;
      const dbCourses = await coursesService.findCourses(title);
      const courses: ViewCourseModel[] = dbCourses.map(
        mapDbCourseToViewCourseModel
      );
      res.json(courses);
      return;
    }
  )
  .get(
    "/:id",
    async (
      req: RequestWithParams<URIParamsCourseModel>,
      res: Response<ViewCourseModel | void>
    ) => {
      const id = +req.params.id;
      const course = await coursesService.findCourseById(id);
      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      } else {
        res.json(mapDbCourseToViewCourseModel(course));
        return;
      }
    }
  )
  .post(
    "",
    authorizationMiddleware,
    titleValidationMiddleware,
    inputValidationMiddleware,
    async (req: RequestWithBody<CreateCourseModel>, res) => {
      const newCourse: CreateCourseModel = {
        title: req.body.title || "unknown",
      };
      const dbCourse = await coursesService.createCourse(newCourse);
      res.status(201).json(mapDbCourseToViewCourseModel(dbCourse));
    }
  )
  .put(
    "/:id",
    titleValidationMiddleware,
    inputValidationMiddleware,
    async (
      req: RequestWithParamsAndBody<URIParamsCourseModel, UpdateCourseModel>,
      res
    ) => {
      const id = +req.params.id;
      const title = req.body.title;

      if (!title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const isCourseUpdated = await coursesService.updateCourse(id, title);
      if (!isCourseUpdated) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
      }
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  )
  .delete("/:id", async (req: RequestWithParams<URIParamsCourseModel>, res) => {
    const id = +req.params.id;
    const isCourseDeleted = await coursesService.deleteCourse(id);
    if (!isCourseDeleted) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.OK_200);
      return;
    }
  });
