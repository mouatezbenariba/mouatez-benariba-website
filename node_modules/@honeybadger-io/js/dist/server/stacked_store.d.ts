import { GlobalStore, Types } from '@honeybadger-io/core';
import { AsyncStore } from './types/async_store';
/**
 * A store that's really a "stack" of stores (async and global)
 * Will proxy calls to the async store if it's active (ie when we enter an async context via `ALS.run()`),
 * otherwise it will fall back to the global store.
 * Both stores in the stack start out with the same contents object.
 * Note that the asyncStore may be null if ALS is not supported.
 */
export declare class StackedStore implements Types.HoneybadgerStore {
    private readonly contents;
    private readonly asyncStore;
    private readonly globalStore;
    constructor(breadcrumbsLimit: number);
    __activeStore(): AsyncStore | GlobalStore;
    available(): boolean;
    getContents(key?: keyof Types.StoreContents): any;
    setContext(context: any): void;
    addBreadcrumb(breadcrumb: any): void;
    clear(): void;
    run<R>(callback: () => R, request?: Record<symbol, unknown>): R;
}
//# sourceMappingURL=stacked_store.d.ts.map