export const db = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "devops" },
    { id: 4, title: "qa" },
  ],
  clear() {
    this.courses = [];
  },
};
