import { HttpException, HttpStatus } from '@nestjs/common';
import { BusinessExceptionCode } from './business.enum';

export type BusinessError = {
  data?: any;
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(response: BusinessError | string, status?: number) {
    if (typeof response === 'string') {
      response = {
        code: BusinessExceptionCode.COMMON,
        message: response,
      };
    }
    // 执行父类构造函数
    super(response, status || HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BusinessExceptionCode.ACCESS_FORBIDDEN,
      message: '暂无无访问权限!',
    });
  }
}
