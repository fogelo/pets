import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/core/exeptions/http-exeption.filter';
import { pipesSetup } from './pipes.setup';

const GLOBAL_PREFIX = 'hometask_13/api/';

export const appSetup = (app: INestApplication) => {
  //специальный метод, который добавляет ко всем маршрутам /GLOBAL_PREFIX
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();
  pipesSetup(app);
  app.useGlobalFilters(new HttpExceptionFilter());
};
