import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export const pipesSetup = (app: INestApplication) => {
  // это означает, что все входящие данные (вообще все запросы в контроллерах)
  // будут сначала проходить через  пайп валидации
  app.useGlobalPipes(
    new ValidationPipe({
      //выбросит ошибку если в теле запроса укажут лишние поля
      whitelist: true, // Удаляет лишние поля
      forbidNonWhitelisted: true, // Выбрасывает ошибку, если есть лишние поля
      //-------
      stopAtFirstError: true, // по одному полю передаем только одну ошибку (первую)
      transform: true, // трансформирует тело запрос, query и uri параметри в указанные типы, createUser(@Body() dto: CreateUserInputDto) - dto будет не просто Object, а CreateUserInputDto
      exceptionFactory(errors) {
        const errorsForResponse: { message: string; field: string }[] = [];
        errors.forEach((error) => {
          if (error.constraints) {
            const constraintKeys = Object.keys(error.constraints);
            constraintKeys.forEach((key) => {
              errorsForResponse.push({
                message: error.constraints ? error.constraints[key] : '',
                field: error.property,
              });
            });
          }
        });
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
};
