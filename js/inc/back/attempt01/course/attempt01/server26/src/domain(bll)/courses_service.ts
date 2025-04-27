import {
  ICourse,
  coursesRepository,
} from "../db_repositories(dal)/courses_repository";

export const coursesService = {
  async findCourses() {
    const courses = coursesRepository.findCourses();
    return courses;
  },
  async findCourseById(id: string): Promise<ICourse | null> {
    const foundCourse: ICourse | null = await coursesRepository.findCourseById(
      id
    );
    return foundCourse;
  },
  async createCourse(title: string): Promise<ICourse> {
    const newCourse = {
      id: new Date().toString(),
      title,
      studentCount: 0,
    };
    const createdCourse = await coursesRepository.createCourse(newCourse);
    return createdCourse;
  },
  async updateCourse(id: string, title: string): Promise<boolean> {
    const result = await coursesRepository.updateCourse(id, title);
    return result;
  },
  async deleteCourse(id: string): Promise<boolean> {
    const result = await coursesRepository.deleteCourse(id);
    return result;
  },
};
