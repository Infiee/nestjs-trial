"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
const business_enum_1 = require("./business.enum");
class BusinessException extends common_1.HttpException {
    constructor(response, status) {
        if (typeof response === 'string') {
            response = {
                code: business_enum_1.BusinessExceptionCode.COMMON,
                message: response,
            };
        }
        super(response, status || common_1.HttpStatus.OK);
    }
    static throwForbidden() {
        throw new BusinessException({
            code: business_enum_1.BusinessExceptionCode.ACCESS_FORBIDDEN,
            message: '暂无无访问权限!',
        });
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=business.exception.js.map