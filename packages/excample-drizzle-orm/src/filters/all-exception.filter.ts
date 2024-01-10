import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

// import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.catchHttpException(exception, host);
    } else if (exception instanceof ZodError) {
      this.catchZodException(exception, host);
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

  catchZodException(exception: ZodError, host: ArgumentsHost) {
    console.log('命中了', exception.errors[0].message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log('zod exception--', exception.flatten().fieldErrors);

    response.status(HttpStatus.BAD_REQUEST).json({
      code: -1,
      // message: exception.errors[0].message,
      message: exception.flatten().fieldErrors,
    });
  }
}
