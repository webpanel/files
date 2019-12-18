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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import "react-chat-widget/lib/styles.css";
import * as React from "react";
import * as moment from "moment";
import * as numeral from "numeral";
import { ResourceCollectionLayer, SortInfoOrder } from "webpanel-data";
import { List, message } from "antd";
import { AuthSession } from "webpanel-auth";
import { DeleteButton } from "./components/delete-button";
import { Pagination } from "./pagination";
import { SpinningCard } from "./spinning-card";
import { Upload } from "./upload";
var FilesList = /** @class */ (function (_super) {
    __extends(FilesList, _super);
    function FilesList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getItemURL = function (item) {
            var token = AuthSession.current().accessToken;
            return item.url + "?access_token=" + token;
        };
        return _this;
    }
    FilesList.prototype.render = function () {
        var _this = this;
        var _a = this.props, dataSource = _a.dataSource, referenceColumn = _a.referenceColumn, referenceID = _a.referenceID, uploadURL = _a.uploadURL, initialFilters = _a.initialFilters, readonly = _a.readonly;
        var filters = {};
        if (referenceID) {
            filters[referenceColumn || "reference"] = referenceID;
        }
        filters = __assign(__assign({}, filters), initialFilters);
        return (React.createElement(ResourceCollectionLayer, { name: "files", key: "files_" + this.props.referenceID, fields: ["id", "name", "url", "createdAt", "size"], initialLimit: 5, initialOffset: 0, initialFilters: filters, initialSorting: [
                {
                    columnKey: "createdAt",
                    order: SortInfoOrder.descend
                }
            ], dataSource: dataSource, render: function (files) { return (React.createElement(SpinningCard, { observedResource: files, title: "Soubory" },
                React.createElement(List, { size: "small", itemLayout: "horizontal", dataSource: files.data || undefined, renderItem: function (item) {
                        return (React.createElement(List.Item, { actions: [
                                React.createElement(DeleteButton, { key: "delete", onDelete: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, files.delete(item.id)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, files.get()];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); } })
                            ] },
                            React.createElement("div", { className: "file-list__item" },
                                React.createElement("div", null,
                                    React.createElement("a", { href: _this.getItemURL(item), target: "_blank" },
                                        React.createElement("h4", null, item.name || React.createElement("i", null, "[unnamed_file]"))),
                                    React.createElement("span", { className: "file-size" }, numeral(item.size).format("0.00b"))),
                                React.createElement("div", { className: "file-list__right-column" },
                                    React.createElement("div", { style: { margin: "auto 0" } }, item.text),
                                    React.createElement("div", { className: "creation-date" }, moment(item.createdAt).calendar())))));
                    } }),
                React.createElement("div", { className: "pagination" },
                    React.createElement(Pagination, { resourceCollection: files })),
                !readonly && (React.createElement(Upload, { url: uploadURL + "?reference=" + _this.props.referenceID + "&" + _this.props.referenceColumn + "=" + _this.props.referenceID, onUploadSuccess: function () {
                        message.success("Soubor nahrán.");
                        files.get();
                    }, onUploadError: function () {
                        return message.error("Soubor se bohužel nepodařilo nahrát.");
                    } })))); } }));
    };
    return FilesList;
}(React.Component));
export { FilesList };
//# sourceMappingURL=list.js.map