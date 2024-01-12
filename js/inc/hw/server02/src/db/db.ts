export interface IBlogDb {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface IPostDb {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export interface IDb {
  blogs: IBlogDb[];
  posts: IPostDb[];
}

export const db: IDb = {
  blogs: [
    {
      id: "1",
      name: "string",
      description: "string",
      websiteUrl: "string",
    },
  ],
  posts: [
    {
      id: "string",
      title: "string",
      shortDescription: "string",
      content: "string",
      blogId: "string",
    },
  ],
};
