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
    function TileGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TileGrid.prototype.componentDidMount = function () {
        this.setState({ tiles: [] }); // needed for instatiation
    };
    TileGrid.prototype.render = function () {
        if (this.state == null || this.state.tiles == null)
            return ('');
        var tiles = [];
        for (var x = 0; x < this.props.tileCountX; x++) {
            for (var y = 0; y < this.props.tileCountY; y++) {
                tiles.push(new Tile_1.default({ positionX: x, positionY: y }));
            }
        }
        var style = {
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto',
            width: '100%',
            height: '100%'
        };
        return (React.createElement("div", { style: style }, tiles.map(function (tile) { return tile.render(); })));
    };
    return TileGrid;
}(React.Component));
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map