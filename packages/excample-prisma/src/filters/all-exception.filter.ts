import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { BusinessError } from './business.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: BusinessError = {
      data: null,
      message: '未知错误',
      code: -1,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception instanceof RuntimeException) {
      errorResponse.message = exception?.message;
    } else {
      errorResponse.message = `${request.url} 未知错误`;
    }

    response.status(status).json(errorResponse);
  }
}
