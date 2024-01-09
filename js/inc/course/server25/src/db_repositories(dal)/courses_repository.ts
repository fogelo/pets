import { client, coursesCollection } from "./db";

export interface ICourse {
  id: string;
  title: string;
  studentCount: number;
}

export interface IDb {
  courses: ICourse[];
}

export const db: IDb = {
  courses: [
    { id: "1", title: "Заголовок 1", studentCount: 10 },
    { id: "2", title: "Заголовок 2", studentCount: 10 },
    { id: "3", title: "Заголовок 3", studentCount: 10 },
    { id: "4", title: "Заголовок 4", studentCount: 10 },
    { id: "5", title: "Заголовок 5", studentCount: 10 },
  ],
};

export const coursesRepository = {
  async findCourses() {
    const courses = coursesCollection.find({}).toArray();
    return courses;
  },
  async findCourseById(id: string): Promise<ICourse | null> {
    const foundCourse: ICourse | null = await coursesCollection.findOne({ id });
    return foundCourse;
  },
  async createCourse(title: string): Promise<ICourse> {
    const newCourse = {
      id: new Date().toString(),
      title,
      studentCount: 0,
    };
    const result = await coursesCollection.insertOne(newCourse);

    return newCourse;
  },
  async updateCourse(id: string, title: string): Promise<boolean> {
    const result = await coursesCollection.updateOne(
      { id },
      { $set: { title } }
    );
    return result.matchedCount === 1;
  },
  async deleteCourse(id: string): Promise<boolean> {
    const result = await coursesCollection.deleteOne({ id });
    return result.deletedCount === 1;
  },
};
