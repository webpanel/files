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
import "react-chat-widget/lib/styles.css";
import * as React from "react";
import { Alert, Card, Spin } from "antd";
var SpinningCard = /** @class */ (function (_super) {
    __extends(SpinningCard, _super);
    function SpinningCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinningCard.prototype.render = function () {
        var _a = this.props, observedResource = _a.observedResource, cardProps = __rest(_a, ["observedResource"]);
        var loading = observedResource.loading;
        var error = observedResource.error;
        var emptyData = !observedResource.getData();
        return (React.createElement(Spin, { spinning: loading },
            React.createElement(Card, __assign({ loading: loading && emptyData }, cardProps), error ? (React.createElement(Alert, { type: "error", message: "Error: " + error })) : (this.props.children))));
    };
    return SpinningCard;
}(React.Component));
export { SpinningCard };
//# sourceMappingURL=spinning-card.js.map