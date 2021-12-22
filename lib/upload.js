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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { Upload as AntdUpload } from "antd";
import { UploadRequest } from "./request";
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (info) {
            var status = info.file.status;
            if (status === "done" && _this.props.onUploadSuccess) {
                console.log("??", info.file.response);
                _this.props.onUploadSuccess(info.file.response);
            }
            else if (status === "error" && _this.props.onUploadError) {
                _this.props.onUploadError(info.file.error, info.file);
            }
        };
        return _this;
    }
    Upload.prototype.render = function () {
        var _a = this.props, url = _a.url, accessToken = _a.accessToken, props = __rest(_a, ["url", "accessToken"]);
        var headers = {};
        if (accessToken) {
            headers.authorization = "Bearer " + accessToken;
        }
        return (React.createElement(AntdUpload.Dragger, __assign({}, props, { name: "file", multiple: true, action: url, onChange: this.onChange, headers: headers, customRequest: UploadRequest }),
            React.createElement("p", null, "Click or drag file to this area to upload file")));
    };
    return Upload;
}(React.Component));
export { Upload };
//# sourceMappingURL=upload.js.map