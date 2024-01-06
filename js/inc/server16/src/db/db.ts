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
