enum LoginFields {
  LoginOrEmail = "loginOrEmail",
  Password = "password",
}

export const loginIncorrectInputTestCases: [string, any, string][] = [
  [
    `${LoginFields.LoginOrEmail}`,
    123,
    `Sending a non-string value for ${LoginFields.LoginOrEmail} should result in an error`,
  ],
  [
    `${LoginFields.Password}`,
    123,
    `Sending a non-string value for ${LoginFields.Password} should result in an error`,
  ],
];
