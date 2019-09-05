var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pagination as AntdPagination } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pagination.prototype.render = function () {
        var _this = this;
        var _a = this.props.resourceCollection, offset = _a.offset, limit = _a.limit, count = _a.count;
        var showCount = count || 0;
        if (offset === undefined || limit === undefined) {
            throw new Error("One of ResourceCollection's required variables is undefined (offset, limit)");
        }
        return (React.createElement(AntdPagination, { current: Math.floor(offset / limit) + 1, total: showCount, defaultPageSize: limit, size: "small", onChange: function (page) {
                return _this.props.resourceCollection.updateOffset((page - 1) * limit);
            } }));
    };
    Pagination = __decorate([
        observer
    ], Pagination);
    return Pagination;
}(React.Component));
export { Pagination };
//# sourceMappingURL=pagination.js.map