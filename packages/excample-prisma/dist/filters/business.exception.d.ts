import { HttpException } from '@nestjs/common';
export type BusinessError = {
    data?: any;
    code: number;
    message: string;
};
export declare class BusinessException extends HttpException {
    constructor(response: BusinessError | string, status?: number);
    static throwForbidden(): void;
}
