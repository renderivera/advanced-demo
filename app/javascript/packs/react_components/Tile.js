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
        var _this = _super.call(this, props) || this;
        _this.data = props.containerState.tilesTmpModel.get(props.id);
        props.containerState.tileComponentRefs.set(_this.props.id, _this);
        return _this;
    }
    Tile.prototype.render = function () {
        var _this = this;
        console.log("render tile: " + this.props.id);
        var tileClass = "tile ";
        if (this.data.active)
            tileClass += "active ";
        if (this.data.cluster)
            tileClass += this.data.cluster; //set cluster as string so you could combine multiple cluster
        return (React.createElement("button", { className: tileClass, onPointerDown: function () { return _this.props.pointerDownHandler(_this.props.id); }, onPointerUp: function () { return _this.props.pointerCancelHandler(_this.props.id); }, onPointerCancel: function () { return _this.props.pointerCancelHandler(_this.props.id); }, onPointerEnter: function () { return _this.props.pointerEnterHandler(_this.props.id); } }, this.props.children));
    };
    return Tile;
}(React.Component));
exports.default = Tile;
//# sourceMappingURL=Tile.js.map