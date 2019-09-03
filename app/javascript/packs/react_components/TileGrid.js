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
        var items = [];
        for (var x = 0; x < this.props.tileCountX; x++) {
            for (var y = 0; y < this.props.tileCountY; y++) {
                items.push(new Tile_1.default({ positionX: x, positionY: y }));
            }
        }
        var styles = {
            grid: {
                display: 'grid',
                'grid-template-columns': 'auto auto auto auto auto auto auto auto auto auto',
                'justify-content': 'space-evenly'
            }
        };
        return (React.createElement("div", { style: styles.grid }, items.map(function (tile) {
            return React.createElement("div", { key: tile.props.positionX + ',' + tile.props.positionY }, tile.props.positionX + ',' + tile.props.positionY);
        })));
    };
    return TileGrid;
}(React.Component));
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map