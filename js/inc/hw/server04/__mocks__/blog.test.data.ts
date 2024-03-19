import { CreateBlogInputModel } from "../src/models/input/blog/create.blog.input.model";
import { maxDescLength, maxNameLength, maxWebsiteUrlLength } from "../src/validators/blog.validators";

export const correctInputBlogData: CreateBlogInputModel = {
  name: "google",
  description: "search engine",
  websiteUrl: "https://www.google.com",
  isMembership: true
};

enum BlogFields {
  Name = "name",
  Description = "description",
  WebsiteUrl = "websiteUrl",
  isMembership = "isMembership",
}

export const blogIncorrectInputTestCases: [string, any, string][] = [
  [
    `${BlogFields.Name}`,
    123,
    `Sending a non-string value for ${BlogFields.Name} should result in an error`,
  ],
  [
    `${BlogFields.Name}`,
    "a".repeat(maxNameLength + 1),
    `Sending a value for ${BlogFields.Name} longer than ${maxNameLength} characters should result in an error`,
  ],
  [
    `${BlogFields.Description}`,
    123,
    `Sending a non-string value for ${BlogFields.Description} should result in an error`,
  ],
  [
    `${BlogFields.Description}`,
    "a".repeat(maxDescLength + 1),
    `Sending a value for ${BlogFields.Description} longer than ${maxDescLength} characters should result in an error`,
  ],
  [
    `${BlogFields.WebsiteUrl}`,
    "123",
    `Sending an incorrectly formatted ${BlogFields.WebsiteUrl} should result in an error`,
  ],
  [
    `${BlogFields.WebsiteUrl}`,
    "a".repeat(maxWebsiteUrlLength + 1),
    `Sending a value for ${BlogFields.WebsiteUrl} longer than ${maxWebsiteUrlLength} characters should result in an error`,
  ],
  [
    `${BlogFields.isMembership}`,
    123,
    `Sending a non-boolean value for ${BlogFields.isMembership} should result in an error`,
  ],
];