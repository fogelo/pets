//dto для боди при создании юзера. Сюда могут быть добавлены декораторы swagger
export class UpdateUserInputDto {
  login: string;
  password: string;
  email: string;
}
