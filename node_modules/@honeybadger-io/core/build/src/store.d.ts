import { HoneybadgerStore, StoreContents } from './types';
export declare class GlobalStore implements HoneybadgerStore {
    private readonly contents;
    private readonly breadcrumbsLimit;
    constructor(contents: StoreContents, breadcrumbsLimit: number);
    static create(contents: StoreContents, breadcrumbsLimit: number): GlobalStore;
    available(): boolean;
    getContents(key?: keyof StoreContents): any;
    setContext(context: any): void;
    addBreadcrumb(breadcrumb: any): void;
    clear(): void;
    run(callback: any): any;
}
//# sourceMappingURL=store.d.ts.map