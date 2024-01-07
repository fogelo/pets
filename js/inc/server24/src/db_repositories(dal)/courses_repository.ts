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
  async findCourses(): Promise<ICourse[]> {
    const courses = db.courses;
    return courses;
  },
  async findCourseById(id: string): Promise<ICourse | undefined> {
    const foundCourse = db.courses.find((course) => course.id === id);
    return foundCourse;
  },
  async createCourse(title: string): Promise<ICourse> {
    const newCourse = {
      id: String(new Date()),
      title,
      studentCount: 0,
    };
    db.courses.push(newCourse);
    return newCourse;
  },
  async updateCourse(id: string, title: string): Promise<boolean> {
    const course = db.courses.find((course) => course.id === id);
    if (course) {
      course.title = title;
      return true;
    } else {
      return false;
    }
  },
  async deleteCourse(id: string): Promise<boolean> {
    db.courses = db.courses.filter((course) => course.id !== id);
    return true;
  },
};
