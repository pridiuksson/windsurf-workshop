"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.createError = createError;
const logger_1 = require("../utils/logger");
function errorHandler(error, req, res, next) {
    logger_1.logger.error('Unhandled error', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        body: req.body
    });
    const statusCode = error.statusCode || 500;
    const code = error.code || 'INTERNAL_ERROR';
    const message = error.message || 'An unexpected error occurred';
    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                details: error.details
            })
        }
    });
}
function createError(message, statusCode = 500, code) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
}
//# sourceMappingURL=errorHandler.js.map