import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorMessage {
  message: string;
  field: string;
}

interface ExceptionResponse {
  message: ErrorMessage[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 400) {
      const error: { errorsMessages: ErrorMessage[] } = {
        errorsMessages: [],
      };
      const exeptionResponse = exception.getResponse() as ExceptionResponse;
      exeptionResponse.message.forEach((m) => error.errorsMessages.push(m));
      response.status(status).json(error);
      return;
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
