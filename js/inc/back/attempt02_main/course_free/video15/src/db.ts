export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
};

export const db: { courses: CourseType[]; clear: () => void } = {
  courses: [
    { id: 1, title: "front-end", studentsCount: 3 },
    { id: 2, title: "back-end", studentsCount: 12 },
    { id: 3, title: "devops", studentsCount: 17 },
    { id: 4, title: "qa", studentsCount: 128 },
  ],
  clear() {
    this.courses = [];
  },
};
