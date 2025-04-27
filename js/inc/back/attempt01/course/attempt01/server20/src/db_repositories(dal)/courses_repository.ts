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
  findCourses(): ICourse[] {
    const courses = db.courses;
    return courses;
  },
  findCourseById(id: string): ICourse | undefined {
    const foundCourse = db.courses.find((course) => course.id === id);
    return foundCourse;
  },
  createCourse(title: string): ICourse {
    const newCourse = {
      id: String(new Date()),
      title,
      studentCount: 0,
    };
    db.courses.push(newCourse);
    return newCourse;
  },
  updateCourse(id: string, title: string) {
    const course = db.courses.find((course) => course.id === id);
    if (course) {
      course.title = title;
      return true;
    } else {
      return false;
    }
  },
  deleteCourse(id: string) {
    db.courses = db.courses.filter((course) => course.id !== id);
    return true;
  },
};
