import * as React from "react";
import * as ReactDOM from "react-dom";

import TileGrid from './react_components/TileGrid';


ReactDOM.render(<TileGrid tileCountX={20} tileCountY={5} findClusterAPIpath="api/v1/largest" />,  document.getElementById("TileGrid"));