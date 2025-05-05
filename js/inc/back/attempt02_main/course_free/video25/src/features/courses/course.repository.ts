import { DbManager } from "../../db/db";
import { CreateCourseModel } from "./models/CreateCourseModel";

export const coursesRepository = {
  async findCourses(title: string | null) {
    if (title) {
      const filteredCourses = DbManager.getCoursesCollection()
        .find({ title: { $regex: title } })
        .toArray();
      return filteredCourses;
    } else {
      return DbManager.getCoursesCollection().find().toArray();
    }
  },
  async findCourseById(id: number) {
    return DbManager.getCoursesCollection().findOne({ id });
  },
  async createCourse(course: CreateCourseModel) {
    const dbCourse = { id: +new Date(), ...course };
    const result = await DbManager.getCoursesCollection().insertOne(dbCourse);
    return dbCourse;
  },
  async updateCourse(id: number, title: string) {
    const result = await DbManager.getCoursesCollection().updateOne(
      { id },
      { $set: { title } }
    );
    const isUpdated = result.matchedCount === 1;
    return isUpdated;
  },
  async deleteCourse(id: number) {
    const result = await DbManager.getCoursesCollection().deleteOne({ id });
    const isDeleted = result.deletedCount === 1;
    return isDeleted;
  },
};
