import * as React from 'react';
import Tile from './Tile';
import {ITile, IGridState} from './ITileProps';


interface IGridProps{
    tileCountX:number;
    tileCountY:number;
    findClusterAPIpath:string;
}

export default class TileGrid extends React.Component<IGridProps,IGridState>{

    constructor(props:IGridProps){
        super(props);

        this.submitTiles = this.submitTiles.bind(this);
        this.gridPointerLeaveHandler = this.gridPointerLeaveHandler.bind(this);
        this.pointerDownHandler = this.pointerDownHandler.bind(this);
        this.pointerCancelHandler = this.pointerCancelHandler.bind(this);
        this.pointerEnterHandler = this.pointerEnterHandler.bind(this);

        this.initTiles();
        this.setStyle();
    }

    public readonly state: IGridState = {
        tilesTmpModel:new Map<string, ITile>(),
        isDragging:false
    }

    private initTiles() {
        for (let y = 0; y < this.props.tileCountY; y++) {            
            for (let x = 0; x < this.props.tileCountX; x++) {
                this.state.tilesTmpModel.set(`${x},${y}`, {x: x, y: y, active:false})
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

    private async submitTiles(){
        let json = JSON.stringify(this.state);

        console.log(json);

        try {
            fetch(this.props.findClusterAPIpath,{
                method: 'post',
                body: json,
                headers: { 'Content-type': 'application/json' }})
            .then(this.successCallback)
        } catch (error) {
            console.log(error);    
        }
    }

    private async successCallback(val: Response){
        console.log(await val.json());
    }





    // handle when the user draws and goes outside the grid
    private gridPointerLeaveHandler(event:React.PointerEvent<HTMLDivElement>) {
        this.pointerCancelHandler();
    }

    private pointerDownHandler(tileID:string) {
        
        this.setState({isDragging: true});
        console.log(tileID);

        let t = this.state.tilesTmpModel.get(tileID);
        t.active = !t.active;


        //this.setState({active: !this.state.active});
    }

    private pointerCancelHandler(tileID?:string) {
        this.setState({isDragging: false});
    }

    private pointerEnterHandler(tileID:string) {
        if(this.state.isDragging){
            this.pointerDownHandler(tileID);
        }
    }


    render() {
        const tiles = [];

        for (const key of this.state.tilesTmpModel.keys()) {
            tiles.push(<Tile key={key} id={key} containerState={this.state}
            pointerDownHandler={this.pointerDownHandler}
            pointerCancelHandler={this.pointerCancelHandler}
            pointerEnterHandler={this.pointerEnterHandler}>
                <p>{key}</p>
            </Tile>
           );
        }

        return(
            <div style={this.style} onPointerLeave={this.gridPointerLeaveHandler}>
                {tiles}
                <button onClick={this.submitTiles}></button>
            </div>
        );
    }
}
/*
{this.state.tilesTmpModel.forEach((value: ITile, key:string, map:any) =>  {
                    <Tile key={key} id={key}
                        pointerDownHandler={this.pointerDownHandler}
                        pointerCancelHandler={this.pointerCancelHandler} 
                        pointerEnterHandler={this.pointerEnterHandler}>
                        <p>{key}</p>    
                    </Tile>
                    })}
*/