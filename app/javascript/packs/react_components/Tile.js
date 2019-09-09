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
        _this.clickDownHandler = _this.clickDownHandler.bind(_this);
        _this.clickUpHandler = _this.clickUpHandler.bind(_this);
        _this.pointerEnterHandler = _this.pointerEnterHandler.bind(_this);
        _this.data = props.containerState.tilesTmpModel.get(props.id);
        return _this;
    }
    Tile.prototype.clickDownHandler = function (event) {
        this.props.pointerDownHandler(this.props.id);
        this.forceUpdate();
    };
    Tile.prototype.clickUpHandler = function (event) {
        this.props.pointerCancelHandler(this.props.id);
    };
    Tile.prototype.pointerEnterHandler = function (event) {
        if (this.props.pointerEnterHandler(this.props.id))
            this.forceUpdate();
    };
    Tile.prototype.render = function () {
        console.log("render tile: " + this.props.id);
        var tileClass = "tile ";
        if (this.data.active)
            tileClass += "active ";
        if (this.data.cluster)
            tileClass += this.data.cluster; //set cluster as string so you could combine multiple cluster
        return (React.createElement("button", { className: tileClass, onPointerDown: this.clickDownHandler, onPointerUp: this.clickUpHandler, onPointerCancel: this.clickUpHandler, onPointerEnter: this.pointerEnterHandler }, this.props.children));
    };
    return Tile;
}(React.Component));
exports.default = Tile;
//# sourceMappingURL=Tile.js.map