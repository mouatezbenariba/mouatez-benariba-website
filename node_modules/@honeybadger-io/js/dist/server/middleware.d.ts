import { NextFunction, Request, Response } from 'express';
import { Types } from '@honeybadger-io/core';
export declare function requestHandler(req: Request, res: Response, next: NextFunction): void;
export declare function errorHandler(err: Types.Noticeable, req: Request, _res: Response, next: NextFunction): unknown;
//# sourceMappingURL=middleware.d.ts.map