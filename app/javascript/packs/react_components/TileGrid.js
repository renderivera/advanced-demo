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
        _this.style = {
            display: 'grid',
            gridTemplateColumns: '',
            width: '100%',
            height: '100%'
        };
        _this.initTiles();
        _this.setStyle();
        return _this;
    }
    TileGrid.prototype.initTiles = function () {
        for (var y = 0; y < this.props.tileCountY; y++) {
            for (var x = 0; x < this.props.tileCountX; x++) {
                this.state.tiles.push(({ positionX: x, positionY: y }));
            }
        }
    };
    TileGrid.prototype.setStyle = function () {
        var colTemplate = '';
        for (var index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto ';
        }
        this.style.gridTemplateColumns = colTemplate;
    };
    // handle when the user draws and goes outside the grid
    TileGrid.prototype.pointerLeaveHandler = function (event) {
        if (Tile_1.default.isDragging)
            Tile_1.default.isDragging = false;
    };
    TileGrid.prototype.submitTiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                json = "";
                fetch(this.props.findClusterAPIpath, {
                    method: 'post',
                    body: json,
                    headers: { 'Content-type': 'application/json' }
                })
                    .then(this.successCallback, this.failureCallback);
                return [2 /*return*/];
            });
        });
    };
    TileGrid.prototype.successCallback = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    TileGrid.prototype.failureCallback = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    TileGrid.prototype.render = function () {
        return (React.createElement("div", { style: this.style, onPointerLeave: this.pointerLeaveHandler },
            this.state.tiles.map(function (tile) {
                return React.createElement(Tile_1.default, { key: tile.positionX + ',' + tile.positionY, positionX: tile.positionX, positionY: tile.positionY });
            }),
            React.createElement("button", { onClick: this.submitTiles })));
    };
    return TileGrid;
}(React.Component));
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map