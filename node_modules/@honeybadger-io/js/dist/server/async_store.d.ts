/// <reference types="node" />
import { Types } from '@honeybadger-io/core';
import type { AsyncLocalStorage } from 'async_hooks';
export declare class AsyncStore implements Types.HoneybadgerStore {
    private als;
    private readonly contents;
    private readonly breadcrumbsLimit;
    constructor(asyncLocalStorage: AsyncLocalStorage<Types.StoreContents>, contents: Types.StoreContents, breadcrumbsLimit: number);
    /**
     * Attempt to create a new AsyncStore instance
     */
    static create(contents: Types.StoreContents, breadcrumbsLimit: number): AsyncStore | null;
    /**
     * This returns the live store object, so we can mutate it.
     * If we're in an async context (a `run()` callback), the stored contents at this point will be returned.
     * Otherwise, the initial stored contents will be returned.
     */
    __currentContents(): Types.StoreContents;
    getContents(key?: keyof Types.StoreContents): any;
    available(): boolean;
    setContext(context: Record<string, unknown>): void;
    addBreadcrumb(breadcrumb: any): void;
    clear(): void;
    run<R>(callback: () => R, request?: Record<symbol, unknown>): R;
}
//# sourceMappingURL=async_store.d.ts.map