import * as React from 'react';
import Tile from './Tile';

interface IGridProps{
    tileCountX:number;
    tileCountY:number;
}

interface IGridState{
    tiles:Array<Tile>;
}

export default class TileGrid extends React.Component<IGridProps,IGridState>{



    componentDidMount(){
        this.setState({tiles: []}); // needed for instatiation
    }


    render() {

        if(this.state == null || this.state.tiles == null)
            return('');           

        const tiles: Array<Tile> = [];

        for (let x = 0; x < this.props.tileCountX; x++) {
            for (let y = 0; y < this.props.tileCountY; y++) {
                tiles.push(new Tile({positionX: x, positionY: y}));
            }            
        }      

        const style = {
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto',
            width: '100%',
            height: '100%'
        };
               
        return(
            <div style={style}>
                {tiles.map(tile => tile.render())}
            </div>
        );
    }
}