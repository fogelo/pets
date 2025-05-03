import { db } from "../../db/db";
import { CreateCourseModel } from "./models/CreateCourseModel";

export const coursesRepository = {
  findCourses(title: string | null) {
    if (title) {
      const filteredCourses = db.courses.filter((course) =>
        course.title.includes(title)
      );
      return filteredCourses;
    } else {
      return db.courses;
    }
  },
  findCourseById(id: number) {
    return db.courses.find((course) => course.id === id);
  },
  createCourse(course: CreateCourseModel) {
    const dbCourse = { id: +new Date(), ...course };
    db.courses.push(dbCourse);
    return dbCourse;
  },
  updateCourse(id: number, title: string) {
    const course = db.courses.find((course) => course.id === id);
    if (course) {
      course.title = title;
      return true;
    } else {
      return false;
    }
  },
  deleteCourse(id: number) {
    const index = db.courses.findIndex((course) => course.id === id);
    if (index === -1) {
      return false;
    } else {
      db.courses.splice(index, 1);
      return true
    }
  },
};
