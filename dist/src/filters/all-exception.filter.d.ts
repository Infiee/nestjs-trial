import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
    catchException(exception: any, host: ArgumentsHost): void;
    catchHttpException(exception: HttpException, host: ArgumentsHost): void;
    catchZodException(exception: ZodError, host: ArgumentsHost): void;
    catchZodValidationException(exception: ZodValidationException, host: ArgumentsHost): void;
}
