import { Request, Response, NextFunction } from 'express';
export interface AppError extends Error {
    statusCode?: number;
    code?: string;
    details?: any;
}
export declare function errorHandler(error: AppError, req: Request, res: Response, next: NextFunction): void;
export declare function createError(message: string, statusCode?: number, code?: string): AppError;
//# sourceMappingURL=errorHandler.d.ts.map