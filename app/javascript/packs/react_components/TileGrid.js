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
var Tile_1 = require("./Tile");
var TileGrid = /** @class */ (function (_super) {
    __extends(TileGrid, _super);
    function TileGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tiles: []
        };
        return _this;
    }
    TileGrid.prototype.componentDidMount = function () {
    };
    TileGrid.prototype.render = function () {
        console.log(this);
        var tiles = [];
        var colTemplate = '';
        for (var y = 0; y < this.props.tileCountY; y++) {
            for (var x = 0; x < this.props.tileCountX; x++) {
                tiles.push(({ positionX: x, positionY: y }));
            }
        }
        for (var index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto ';
        }
        var style = {
            display: 'grid',
            gridTemplateColumns: colTemplate,
            width: '100%',
            height: '100%'
        };
        return (React.createElement("div", { style: style }, tiles.map(function (tile) {
            return React.createElement(Tile_1.default, { key: tile.positionX + ',' + tile.positionY, positionX: tile.positionX, positionY: tile.positionY });
        })));
    };
    return TileGrid;
}(React.Component));
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map