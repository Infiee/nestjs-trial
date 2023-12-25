import { HttpException, HttpStatus } from '@nestjs/common';

export enum ApiCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 请求成功

  COMMON_ERROR = 4000, // 通用异常

  BUSINESS_ERROR = 4001, // 业务错误
  PARAMS_ERROR = 4002, // 参数不合法
  SIGN_ERROR = 4003, // 验签失败
  TOKEN_ERROR = 4004, // token不合法

  ACCESS_FORBIDDEN = 4005, // token不合法
}

export type ApiError = {
  data?: any;
  code: number;
  message: string;
};

export class ApiException extends HttpException {
  private apiExceptionResponse: ApiError;

  constructor(response: ApiError | string, statusCode?: HttpStatus) {
    if (typeof response === 'string') {
      response = {
        code: ApiCode.COMMON_ERROR,
        message: response,
      };
    }
    super(response, statusCode || HttpStatus.OK);

    this.apiExceptionResponse = response;
  }

  gerErrorResponse(): ApiError {
    return this.apiExceptionResponse;
  }

  static throwForbidden() {
    throw new ApiException({
      code: ApiCode.ACCESS_FORBIDDEN,
      message: '暂无无访问权限!',
    });
  }
}
