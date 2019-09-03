"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(props) {
        return _super.call(this, props) || this;
    }
    Tile.prototype.render = function () {
        var key = this.props.positionX + ',' + this.props.positionY;
        return (React.createElement("button", { key: key }, key));
    };
    return Tile;
}(React.Component));
exports.default = Tile;
//# sourceMappingURL=Tile.js.map