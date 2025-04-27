import { CreatePostInputModel } from "../src/models/input/post/create.post.input.model";
import {
  maxTitleLength,
  maxShortDescriptionLength,
  maxContentLength,
} from "../src/validators/post.validators";

export enum PostFields {
  Title = "title",
  ShortDescription = "shortDescription",
  Content = "content",
  BlogId = "blogId",
}

export const postIncorrectInputTestCases: [string, any, string][] = [
  [
    `${PostFields.Title}`,
    123,
    `Sending a non-string value for ${PostFields.Title} should result in an error`,
  ],
  [
    `${PostFields.Title}`,
    "a".repeat(maxTitleLength + 1),
    `Sending a value for ${PostFields.Title} longer than ${maxTitleLength} characters should result in an error`,
  ],
  [
    `${PostFields.ShortDescription}`,
    123,
    `Sending a non-string value for ${PostFields.ShortDescription} should result in an error`,
  ],
  [
    `${PostFields.ShortDescription}`,
    "a".repeat(maxShortDescriptionLength + 1),
    `Sending a value for ${PostFields.ShortDescription} longer than ${maxShortDescriptionLength} characters should result in an error`,
  ],
  [
    `${PostFields.Content}`,
    123,
    `Sending a non-string value for ${PostFields.Content} should result in an error`,
  ],
  [
    `${PostFields.Content}`,
    "a".repeat(maxContentLength + 1),
    `Sending a value for ${PostFields.Content} longer than ${maxContentLength} characters should result in an error`,
  ],
  [
    `${PostFields.BlogId}`,
    123,
    `Sending a non-string value for ${PostFields.BlogId} should result in an error`,
  ],
];

export const correctInputPostData: CreatePostInputModel = {
  title: "string",
  shortDescription: "string",
  content: "string",
  blogId: "string",
};
