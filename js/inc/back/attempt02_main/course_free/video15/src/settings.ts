import { CourseType, db } from "./db";
import { HTTP_STATUSES } from "./http_statuses";
import express, { Express, Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types";
import { CreateCourseModel } from "./models/CreateCourseModel";
import { UpdateCourseModel } from "./models/UpdateCourseModel";
import { QueryCourseModel } from "./models/QueryCourseModel";
import { ViewCourseModel } from "./models/ViewCourseModel";
import { URIParamsCourseModel } from "./models/URIParamsCourseModel";

export const app: Express = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const mapCourseToViewCourseModel = (course: CourseType): ViewCourseModel => {
  return { id: course.id, title: course.title };
};

app.get(
  "/courses",
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
        mapCourseToViewCourseModel
      );
      res.json(courses);
      return;
    } else {
      const courses: ViewCourseModel[] = db.courses.map(
        mapCourseToViewCourseModel
      );
      res.json(courses);
      return;
    }
  }
);

app.get(
  "/courses/:id",
  (
    req: RequestWithParams<URIParamsCourseModel>,
    res: Response<ViewCourseModel | void>
  ) => {
    const course = db.courses.find((course) => course.id === +req.params.id);
    if (!course) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    } else {
      res.json(mapCourseToViewCourseModel(course));
      return;
    }
  }
);

app.post("/courses", (req: RequestWithBody<CreateCourseModel>, res) => {
  const newCourse: CourseType = {
    id: +new Date(),
    title: req.body.title || "unknown",
    studentsCount: 0,
  };

  db.courses.push(newCourse);
  res.status(201).json();
});

app.put(
  "/courses/:id",
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
);

app.delete(
  "/courses/:id",
  (req: RequestWithParams<URIParamsCourseModel>, res) => {
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
  }
);
