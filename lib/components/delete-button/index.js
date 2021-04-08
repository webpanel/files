var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
var DeleteButton = /** @class */ (function (_super) {
    __extends(DeleteButton, _super);
    function DeleteButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteButton.prototype.render = function () {
        var _this = this;
        return (React.createElement(Popconfirm, { title: "Do you want to delete this item?", cancelText: "No", okText: "Yes", onConfirm: function () { return _this.props.onDelete(); } },
            React.createElement(Button, { danger: true, size: "small" },
                React.createElement(DeleteOutlined, null))));
    };
    return DeleteButton;
}(React.Component));
export { DeleteButton };
//# sourceMappingURL=index.js.map