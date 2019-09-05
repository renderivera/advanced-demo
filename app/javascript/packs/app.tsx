import * as React from "react";
import * as ReactDOM from "react-dom";

import TileGrid from './react_components/TileGrid';


ReactDOM.render(<TileGrid tileCountX={10} tileCountY={20} findClusterAPIpath="api/v1/largest" />,  document.getElementById("TileGrid"));