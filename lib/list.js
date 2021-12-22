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
import { Checkbox, List, message } from "antd";
import { SortInfoOrder, useResourceCollection, } from "webpanel-data";
import { DeleteButton } from "./components/delete-button";
import { ListItem } from "./list-item";
import { SpinningCard } from "./spinning-card";
import { Upload } from "./upload";
export var FilesList = function (props) {
    var dataSource = props.dataSource, referenceColumn = props.referenceColumn, referenceID = props.referenceID, uploadURL = props.uploadURL, hostURL = props.hostURL, initialFilters = props.initialFilters, readonly = props.readonly, accessToken = props.accessToken;
    var filters = { status: "COMPLETED" };
    if (referenceID) {
        filters[referenceColumn || "reference"] = referenceID;
    }
    filters = __assign(__assign({}, filters), initialFilters);
    var _a = React.useState({}), selectedIDs = _a[0], setSelectedIDs = _a[1];
    var selectedCount = Object.keys(selectedIDs).length;
    var files = useResourceCollection({
        name: "files",
        fields: ["id", "name", "createdAt", "size"],
        initialLimit: 99,
        initialOffset: 0,
        initialFilters: filters,
        initialSorting: [
            {
                columnKey: "createdAt",
                order: SortInfoOrder.descend,
            },
        ],
        dataSource: dataSource,
    });
    return (React.createElement(SpinningCard, { observedResource: files, title: "Soubory", extra: [
            React.createElement(DeleteButton, { onDelete: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Promise.all(Object.keys(selectedIDs).map(function (id) {
                                    var item = files.getItem({ id: id });
                                    return item.update({ status: "DELETED" });
                                }))];
                            case 1:
                                _a.sent();
                                files.get();
                                setSelectedIDs({});
                                return [2 /*return*/];
                        }
                    });
                }); } }),
            " ",
            React.createElement(Checkbox, { checked: selectedCount > 0, indeterminate: selectedCount > 0 && selectedCount !== files.count, onChange: function () {
                    if (selectedCount === 0) {
                        var values = {};
                        for (var _i = 0, _a = files.getData() || []; _i < _a.length; _i++) {
                            var f = _a[_i];
                            values[f.id] = true;
                        }
                        setSelectedIDs(values);
                    }
                    else {
                        setSelectedIDs({});
                    }
                } }),
        ] },
        React.createElement(List, { size: "small", itemLayout: "horizontal", dataSource: files.data || undefined, pagination: { position: "bottom", defaultPageSize: 5 }, renderItem: function (item) {
                return (React.createElement(List.Item, { actions: [
                        React.createElement(Checkbox, { onChange: function () {
                                var values = __assign({}, selectedIDs);
                                if (values[item.id]) {
                                    delete values[item.id];
                                }
                                else {
                                    values[item.id] = true;
                                }
                                setSelectedIDs(values);
                            }, checked: selectedIDs[item.id] }),
                    ] },
                    React.createElement(ListItem, { item: item, hostURL: hostURL, accessToken: accessToken })));
            } }),
        !readonly && (React.createElement(Upload, { url: uploadURL + "?reference=" + props.referenceID + "&" + props.referenceColumn + "=" + props.referenceID, accessToken: accessToken, onUploadSuccess: function (response) { return __awaiter(void 0, void 0, void 0, function () {
                var f;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            f = files.getItem({ id: response.id });
                            return [4 /*yield*/, f.update({ status: "COMPLETED" })];
                        case 1:
                            _a.sent();
                            message.success("Soubor nahrán.");
                            files.get();
                            return [2 /*return*/];
                    }
                });
            }); }, onUploadError: function () {
                return message.error("Soubor se bohužel nepodařilo nahrát.");
            }, style: { marginTop: 20 } }))));
};
//# sourceMappingURL=list.js.map