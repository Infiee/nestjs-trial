import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.catchHttpException(exception, host);
    } else {
      this.catchException(exception, host);
    }
  }

  catchException(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log('exception--', exception);

    response.status(HttpStatus.BAD_REQUEST).json({
      code: -1,
      message: '捕获异常',
      error: exception,
    });
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      message: exception.message,
    });
  }
}
