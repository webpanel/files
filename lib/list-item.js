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
import { Spin, message, Image, Popover } from "antd";
export var ListItem = function (props) {
    var _a = React.useState(false), loading = _a[0], setLoading = _a[1];
    var item = props.item, hostURL = props.hostURL, accessToken = props.accessToken;
    var openItem = function (hostURL, item, token) { return __awaiter(void 0, void 0, void 0, function () {
        var windowRef, url, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    windowRef = window.open();
                    return [4 /*yield*/, fetch(hostURL + "/" + item.id, {
                            method: "GET",
                            headers: { Authorization: "Bearer " + token },
                        })
                            .then(function (res) { return res.json(); })
                            .then(function (json) { return json.url; })];
                case 1:
                    url = _a.sent();
                    if (windowRef) {
                        windowRef.location = url;
                    }
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    message.error(err_1.message);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var tooltipContent = item.largeThumbnail && (React.createElement("div", null,
        React.createElement(Image, { width: 250, src: item.largeThumbnail.url, placeholder: true })));
    var d = moment(item.createdAt);
    return (React.createElement("div", { className: "file-list__item" },
        item.smallThumbnail && (React.createElement("div", { className: "file-list__thumbnail" },
            React.createElement(Popover, { content: tooltipContent },
                React.createElement(Image, { src: item.smallThumbnail.url, width: 50, preview: false, placeholder: true })))),
        React.createElement("div", null,
            React.createElement("a", { onClick: function () { return openItem(hostURL, item, accessToken); }, href: "#" },
                React.createElement("h4", null, item.name || React.createElement("i", null, "[unnamed_file]")),
                loading && React.createElement(Spin, { size: "small" })),
            React.createElement("span", { className: "creation-date" },
                d.format("l"),
                " ",
                d.format("LT"))),
        React.createElement("div", { className: "file-list__right-column" },
            React.createElement("div", { style: { margin: "auto 0" } }, item.text))));
};
//# sourceMappingURL=list-item.js.map