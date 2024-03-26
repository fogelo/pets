import { CreateUserInputModel } from "../src/models/input/user/create.user.input.model";
import {
  maxLoginLength,
  maxPasswordLength,
  minLoginLength,
  minPasswordLength,
} from "../src/validators/user.validators";

export const correctInputUserData: CreateUserInputModel = {
  login: "anton",
  email: "anton@mail.ru",
  password: "123123123",
};

enum UserFields {
  Login = "login",
  Email = "email",
  Password = "password",
}

export const userIncorrectInputTestCases: [string, any, string][] = [
  [
    `${UserFields.Login}`,
    123,
    `Sending a non-string value for ${UserFields.Login} should result in an error`,
  ],
  [
    `${UserFields.Login}`,
    "a".repeat(maxLoginLength + 1),
    `Sending a value for ${UserFields.Login} longer than ${maxLoginLength} characters should result in an error`,
  ],
  [
    `${UserFields.Login}`,
    "a".repeat(minLoginLength - 1),
    `Sending a value for ${UserFields.Login} less than ${minLoginLength} characters should result in an error`,
  ],
  [
    `${UserFields.Email}`,
    123,
    `Sending a non-string value for ${UserFields.Email} should result in an error`,
  ],
  [
    `${UserFields.Email}`,
    "a".repeat(10),
    `Sending a value for ${UserFields.Email} that does not match the pattern should return an error`,
  ],
  [
    `${UserFields.Password}`,
    "a".repeat(maxPasswordLength + 1),
    `Sending a value for ${UserFields.Password} longer than ${maxPasswordLength} characters should result in an error`,
  ],
  [
    `${UserFields.Password}`,
    "a".repeat(minPasswordLength - 1),
    `Sending a value for ${UserFields.Password} less than ${minPasswordLength} characters should result in an error`,
  ],
];
