import express, { Request, Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";
import { UpdateCourseModel } from "./models/UpdateCourseModel";
import { QueryCourseModel } from "./models/QueryCourseModel";
import { CreateCourseModel } from "./models/CreateCourseModel";
import { CourseViewModel } from "./models/CourseViewModel";
import { URIParamsCourseIdModel } from "./models/URIParamsCourseIdModel";
export const app = express();
app.use(express.json()); // Для разбора JSON тел запросов

const port = 3004;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

interface ICourse {
  id: string;
  title: string;
  studentCount: number;
}

const db: { courses: ICourse[] } = {
  courses: [
    { id: "1", title: "Заголовок 1", studentCount: 10 },
    { id: "2", title: "Заголовок 2", studentCount: 10 },
    { id: "3", title: "Заголовок 3", studentCount: 10 },
    { id: "4", title: "Заголовок 4", studentCount: 10 },
    { id: "5", title: "Заголовок 5", studentCount: 10 },
  ],
};

const getCourseViewModel = (dbCourse: ICourse): CourseViewModel => ({
  id: dbCourse.id,
  title: dbCourse.title,
});

// get
// можно типизировать Request и Response вот так, но они автоматом тоже подхватываются
app.get("/", (req: Request, res: Response) => {
  res.sendStatus(HTTP_STATUSES.OK_200);
});

app.get(
  "/courses",
  (
    req: RequestWithQuery<QueryCourseModel>,
    res: Response<CourseViewModel[]>
  ) => {
    res.status(HTTP_STATUSES.OK_200);
    res.json(db.courses.map(getCourseViewModel));
  }
);

app.get(
  "/courses/:id",
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
app.post(
  "/courses",
  (req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
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
      res.json(newCourse);
    } else {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
  }
);

// delete
app.delete(
  "/courses/:id",
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
app.put(
  "/courses/:id",
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

// для тестов
app.delete("/__test__/data", (req, res) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

// запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
