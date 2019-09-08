"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var TileGrid_1 = require("./react_components/TileGrid");
ReactDOM.render(React.createElement(TileGrid_1.default, { tileCountX: 20, tileCountY: 5, findClusterAPIpath: "api/v1/largest" }), document.getElementById("TileGrid"));
//# sourceMappingURL=app.js.map