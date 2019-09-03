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

    // handle when the user draws and goes outside the grid
    private pointerLeaveHandler(event:React.PointerEvent<HTMLDivElement>)
    {
        if(Tile.isDragging)
            Tile.isDragging = false;
    }



    render() {

        console.log(this);

        const tiles: Array<ITileProps> = [];

        let colTemplate = '';

        for (let y = 0; y < this.props.tileCountY; y++)
        {            
            for (let x = 0; x < this.props.tileCountX; x++)
            {
                tiles.push(({positionX: x, positionY: y}));
            }            
        }      

        for (let index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto ';
        }

        const style = {
            display: 'grid',
            gridTemplateColumns: colTemplate,
            width: '100%',
            height: '100%'
        };
               
        return(
            <div style={style} onPointerLeave={this.pointerLeaveHandler}>
                {tiles.map(tile => 
                    <Tile key={tile.positionX+','+tile.positionY} 
                        positionX={tile.positionX} positionY={tile.positionY} />
                    )}
            </div>
        );
    }
}