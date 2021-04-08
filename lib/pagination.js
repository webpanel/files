import * as React from "react";
import { Pagination as AntdPagination } from "antd";
export var Pagination = function (props) {
    var _a = props.resourceCollection, offset = _a.offset, limit = _a.limit, count = _a.count;
    var showCount = count || 0;
    if (offset === undefined || limit === undefined) {
        throw new Error("One of ResourceCollection's required variables is undefined (offset, limit)");
    }
    return (React.createElement(AntdPagination, { current: Math.floor(offset / limit) + 1, total: showCount, defaultPageSize: limit, size: "small", onChange: function (page) {
            return props.resourceCollection.updateOffset((page - 1) * limit);
        } }));
};
//# sourceMappingURL=pagination.js.map