import * as React from 'react';
import Tile from './Tile';
import ITileProps from './ITileProps';

interface IGridProps{
    tileCountX:number;
    tileCountY:number;
}

interface IGridState{
    tiles:Array<Tile>;
}

export default class TileGrid extends React.Component<IGridProps,IGridState>{

    constructor(props:IGridProps){
        super(props);
    }

    public readonly state: IGridState = {
        tiles: []
    }


    componentDidMount(){
        
    }


    render() {

        console.log(this);

        const tiles: Array<ITileProps> = [];


        for (let x = 0; x < this.props.tileCountX; x++) {
            for (let y = 0; y < this.props.tileCountY; y++) {
                tiles.push(({positionX: x, positionY: y,}));
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
                {tiles.map(tile => 
                    <Tile key={tile.positionX+','+tile.positionY} 
                        positionX={tile.positionX} positionY={tile.positionY} />
                    )}
            </div>
        );
    }
}