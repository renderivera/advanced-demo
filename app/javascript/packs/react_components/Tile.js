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
        _this.state = {
            active: false
        };
        _this.clickDownHandler = _this.clickDownHandler.bind(_this);
        _this.pointerEnterHandler = _this.pointerEnterHandler.bind(_this);
        return _this;
    }
    Tile.prototype.clickDownHandler = function (event) {
        Tile.isDragging = true;
        this.setState({ active: !this.state.active });
    };
    Tile.prototype.clickUpHandler = function (event) {
        Tile.isDragging = false;
    };
    Tile.prototype.pointerEnterHandler = function (event) {
        if (Tile.isDragging) {
            this.clickDownHandler(event);
        }
    };
    Tile.prototype.componentDidMount = function () {
    };
    Tile.prototype.render = function () {
        var color = '';
        if (this.state.active) {
            color = 'gray';
        }
        else {
            color = 'white';
        }
        var style = {
            backgroundColor: color
        };
        return (React.createElement("button", { style: style, onPointerDown: this.clickDownHandler, onPointerUp: this.clickUpHandler, onPointerCancel: this.clickUpHandler, onPointerEnter: this.pointerEnterHandler }, this.props.positionX + ',' + this.props.positionY));
    };
    Tile.isDragging = false;
    return Tile;
}(React.Component));
exports.default = Tile;
//# sourceMappingURL=Tile.js.map