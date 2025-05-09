import { coursesRepository } from "./course.repository";
import { CreateCourseModel } from "./models/CreateCourseModel";

export const coursesService = {
  async findCourses(title: string | null) {
    return coursesRepository.findCourses(title);
  },
  async findCourseById(id: number) {
    return coursesRepository.findCourseById(id);
  },
  async createCourse(course: CreateCourseModel) {
    const dbCourse = { id: +new Date(), ...course };
    const createdCourse = await coursesRepository.createCourse(dbCourse);
    return createdCourse;
  },
  async updateCourse(id: number, title: string) {
    const isUpdated = coursesRepository.updateCourse(id, title);
    return isUpdated;
  },
  async deleteCourse(id: number) {
    const isDeleted = coursesRepository.deleteCourse(id);
    return isDeleted;
  },
};
