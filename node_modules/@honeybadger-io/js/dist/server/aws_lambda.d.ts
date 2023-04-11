import type { Handler, Callback, Context } from 'aws-lambda';
export declare type SyncHandler<TEvent = any, TResult = any> = (event: TEvent, context: Context, callback: Callback<TResult>) => void;
export declare type AsyncHandler<TEvent = any, TResult = any> = (event: TEvent, context: Context) => Promise<TResult>;
export declare function lambdaHandler<TEvent = any, TResult = any>(handler: Handler<TEvent, TResult>): Handler<TEvent, TResult>;
/**
 * Removes AWS Lambda default listener that
 * exits the process before letting us report to honeybadger.
 */
export declare function removeAwsDefaultUncaughtExceptionListener(): void;
//# sourceMappingURL=aws_lambda.d.ts.map