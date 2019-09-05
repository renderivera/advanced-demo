import * as React from 'react';
import Tile from './Tile';
import {ITile} from './ITileProps';

interface IGridProps{
    tileCountX:number;
    tileCountY:number;
    findClusterAPIpath:string;
}

interface IGridState{
    tiles:Array<ITile>;
}

export default class TileGrid extends React.Component<IGridProps,IGridState>{

    constructor(props:IGridProps){
        super(props);

        this.initTiles();      
        this.setStyle();
    }

    public readonly state: IGridState = {
        tiles: []
    }

    private initTiles() {
        for (let y = 0; y < this.props.tileCountY; y++)
        {            
            for (let x = 0; x < this.props.tileCountX; x++)
            {
                this.state.tiles.push(({positionX: x, positionY: y}));
            }            
        }
    }


    private setStyle() {
        let colTemplate = '';

        for (let index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto ';
        }

        this.style.gridTemplateColumns = colTemplate;
    }

    private style = {
        display: 'grid',
        gridTemplateColumns: '',
        width: '100%',
        height: '100%'
    }

    // handle when the user draws and goes outside the grid
    private pointerLeaveHandler(event:React.PointerEvent<HTMLDivElement>) {
        if(Tile.isDragging)
            Tile.isDragging = false;
    }

    private async submitTiles(){

        let json = "";


        fetch(this.props.findClusterAPIpath,{
            method: 'post',
            body: json,
            headers: { 'Content-type': 'application/json' }})
        .then(this.successCallback,this.failureCallback)
    }

    private async successCallback(val: Response){

    }
    private async failureCallback(val: Response){
        
    }


    render() {
               
        return(
            <div style={this.style} onPointerLeave={this.pointerLeaveHandler}>
                {this.state.tiles.map(tile => 
                    <Tile key={tile.positionX+','+tile.positionY} 
                        positionX={tile.positionX} positionY={tile.positionY} />
                    )}
                    <button onClick={this.submitTiles}></button>
            </div>
        );
    }
}