"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStore = void 0;
var util_1 = require("./util");
var GlobalStore = /** @class */ (function () {
    function GlobalStore(contents, breadcrumbsLimit) {
        this.contents = contents;
        this.breadcrumbsLimit = breadcrumbsLimit;
    }
    GlobalStore.create = function (contents, breadcrumbsLimit) {
        return new GlobalStore(contents, breadcrumbsLimit);
    };
    GlobalStore.prototype.available = function () {
        return true;
    };
    GlobalStore.prototype.getContents = function (key) {
        var value = key ? this.contents[key] : this.contents;
        return JSON.parse(JSON.stringify(value));
    };
    GlobalStore.prototype.setContext = function (context) {
        this.contents.context = (0, util_1.merge)(this.contents.context, context || {});
    };
    GlobalStore.prototype.addBreadcrumb = function (breadcrumb) {
        if (this.contents.breadcrumbs.length == this.breadcrumbsLimit) {
            this.contents.breadcrumbs.shift();
        }
        this.contents.breadcrumbs.push(breadcrumb);
    };
    GlobalStore.prototype.clear = function () {
        this.contents.context = {};
        this.contents.breadcrumbs = [];
    };
    GlobalStore.prototype.run = function (callback) {
        return callback();
    };
    return GlobalStore;
}());
exports.GlobalStore = GlobalStore;
//# sourceMappingURL=store.js.map