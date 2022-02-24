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
import { useTranslation } from "react-i18next";
export var Upload = function (props) {
    var t = useTranslation("webpanel-files").t;
    var onChange = function (info) {
        var status = info.file.status;
        if (status === "done" && props.onUploadSuccess) {
            props.onUploadSuccess(info.file.response);
        }
        else if (status === "error" && props.onUploadError) {
            props.onUploadError(info.file.error, info.file);
        }
    };
    var url = props.url, accessToken = props.accessToken, rest = __rest(props, ["url", "accessToken"]);
    var headers = {};
    if (accessToken) {
        headers.authorization = "Bearer " + accessToken;
    }
    return (React.createElement(AntdUpload.Dragger, __assign({}, rest, { name: "file", multiple: true, action: url, onChange: onChange, headers: headers, customRequest: UploadRequest }),
        React.createElement("p", null, t("upload_dagger_text"))));
};
//# sourceMappingURL=upload.js.map