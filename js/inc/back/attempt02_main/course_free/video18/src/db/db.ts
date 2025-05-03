export type CourseType = {
  id: number;
  title: string;
};

export type UserType = { id: number; userName: string };
export type BindingType = {
  id: number;
  userId: number;
  courseId: number;
  date: Date;
};

export type DbType = {
  courses: CourseType[];
  users: UserType[];
  userCourseBindings: BindingType[];
  clear: () => void;
};

export const db: DbType = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "devops" },
    { id: 4, title: "qa" },
  ],
  users: [
    { id: 1, userName: "dimych" },
    { id: 2, userName: "ivan" },
    { id: 3, userName: "anton" },
  ],
  userCourseBindings: [
    { id: 1, userId: 1, courseId: 1, date: new Date(2022, 10, 1) },
    { id: 2, userId: 1, courseId: 2, date: new Date(2022, 10, 1) },
    { id: 3, userId: 2, courseId: 2, date: new Date(2022, 10, 1) },
  ],
  clear() {
    this.courses = [];
    this.users = [];
    this.userCourseBindings = [];
  },
};
