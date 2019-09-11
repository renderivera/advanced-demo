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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Tile_1 = require("./Tile");
var TileGrid = /** @class */ (function (_super) {
    __extends(TileGrid, _super);
    function TileGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            tilesTmpModel: new Map(),
            tileComponentRefs: new Map()
        };
        _this.style = { display: 'grid', gridTemplateColumns: null, width: '100%', height: '100%' };
        _this.fetchRequest = { method: 'post', body: null, headers: { 'Content-type': 'application/json' } };
        _this.currentLargestCluster = null;
        _this.isDragging = false;
        _this.submitTiles = _this.submitTiles.bind(_this);
        _this.gridPointerLeaveHandler = _this.gridPointerLeaveHandler.bind(_this);
        _this.pointerDownHandler = _this.pointerDownHandler.bind(_this);
        _this.pointerCancelHandler = _this.pointerCancelHandler.bind(_this);
        _this.pointerEnterHandler = _this.pointerEnterHandler.bind(_this);
        _this.largestClusterAPIcallback = _this.largestClusterAPIcallback.bind(_this);
        _this.initTiles();
        _this.initStyle();
        return _this;
    }
    TileGrid.prototype.initTiles = function () {
        for (var y = 0; y < this.props.tileCountY; y++) {
            for (var x = 0; x < this.props.tileCountX; x++) {
                this.state.tilesTmpModel.set(x + "," + y, { x: x, y: y });
            }
        }
    };
    TileGrid.prototype.initStyle = function () {
        var colTemplate = '';
        for (var index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto '; // add an auto for each x-int / column for dynamic resizing
        }
        this.style.gridTemplateColumns = colTemplate;
    };
    TileGrid.prototype.submitTiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var obb;
            return __generator(this, function (_a) {
                obb = { xCount: this.props.tileCountX,
                    yCount: this.props.tileCountY,
                    tiles: __spread(this.state.tilesTmpModel) };
                this.fetchRequest.body = JSON.stringify(obb);
                try {
                    fetch(this.props.findClusterAPIpath, this.fetchRequest)
                        .then(this.largestClusterAPIcallback);
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    TileGrid.prototype.largestClusterAPIcallback = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            var largestCluster;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, val.json()];
                    case 1:
                        largestCluster = _a.sent();
                        if (largestCluster == null) // casting error
                            return [2 /*return*/]; //TODO: define with stakeholder whether to throw an error here    
                        this.resetCurrentLargestCluster(largestCluster);
                        largestCluster.map(function (tileID) {
                            var tile = _this.state.tilesTmpModel.get(tileID);
                            tile.cluster = "largest ";
                            _this.rerenderTile(tileID);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TileGrid.prototype.resetCurrentLargestCluster = function (largestCluster) {
        var _this = this;
        if (this.currentLargestCluster != null) {
            this.currentLargestCluster.map(function (tileID) {
                var tile = _this.state.tilesTmpModel.get(tileID);
                tile.cluster = "";
                _this.rerenderTile(tileID);
            });
        }
        this.currentLargestCluster = largestCluster; //set to null if no largestCluster parameter provided
    };
    TileGrid.prototype.rerenderTile = function (tileID) {
        var tc = this.state.tileComponentRefs.get(tileID);
        tc.forceUpdate(); // rerender selected tile
    };
    TileGrid.prototype.gridPointerLeaveHandler = function (event) {
        this.pointerCancelHandler(); // handle when the user drags outside the grid
    };
    TileGrid.prototype.pointerDownHandler = function (tileID) {
        var t = this.state.tilesTmpModel.get(tileID);
        t.active = !t.active;
        this.resetCurrentLargestCluster();
        this.rerenderTile(tileID);
        if (!this.isDragging)
            this.isDragging = true;
    };
    TileGrid.prototype.pointerCancelHandler = function (tileID) {
        if (this.isDragging)
            this.isDragging = false;
    };
    TileGrid.prototype.pointerEnterHandler = function (tileID) {
        if (this.isDragging) {
            this.pointerDownHandler(tileID);
        }
    };
    TileGrid.prototype.render = function () {
        var e_1, _a;
        console.log("render grid");
        var tiles = [];
        try {
            for (var _b = __values(this.state.tilesTmpModel.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                tiles.push(React.createElement(Tile_1.default, { key: key, id: key, containerState: this.state, pointerDownHandler: this.pointerDownHandler, pointerCancelHandler: this.pointerCancelHandler, pointerEnterHandler: this.pointerEnterHandler },
                    React.createElement("p", { className: "tileText" }, key)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { className: "submitButton", onClick: this.submitTiles },
                React.createElement("p", null, "Find Largest Cluster")),
            React.createElement("div", { className: "tileGrid", style: this.style, onPointerLeave: this.gridPointerLeaveHandler }, tiles)));
    };
    return TileGrid;
}(React.Component));
exports.default = TileGrid;
//# sourceMappingURL=TileGrid.js.map