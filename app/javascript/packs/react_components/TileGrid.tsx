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
        this.largestClusterAPIcallback = this.largestClusterAPIcallback.bind(this);

        this.initTiles();
        this.initStyle();
    }

    public readonly state: IGridState = {
        tilesTmpModel:new Map<string, ITile>(),
        tileComponentRefs: new Map<string, React.Component>()
    };
    private readonly style: React.CSSProperties = {display: 'grid', gridTemplateColumns: null, width: '100%', height: '100%'};
    private fetchRequest: RequestInit = {method: 'post', body: null, headers: { 'Content-type': 'application/json' }};

    

    private initTiles() {
        for (let y = 0; y < this.props.tileCountY; y++) {            
            for (let x = 0; x < this.props.tileCountX; x++) {
                this.state.tilesTmpModel.set(`${x},${y}`, {x: x, y: y})
            }            
        }
    }

    private initStyle() {
        let colTemplate = '';
        for (let index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto '; // add an auto for each x-int / column for dynamic resizing
        }
        this.style.gridTemplateColumns = colTemplate;
    }

    private async submitTiles(){
        let obb = {xCount:this.props.tileCountX, 
            yCount:this.props.tileCountY, 
            tiles:[...this.state.tilesTmpModel]}; // ... spreads contents of Map; necessarry, stringify doesnt work with iterables

        this.fetchRequest.body = JSON.stringify(obb);

        try {
            fetch(this.props.findClusterAPIpath, this.fetchRequest)
            .then(this.largestClusterAPIcallback)
        } catch (error) {
            console.log(error);
        }
    }

    private currentLargestCluster:string[] = null; // TODO: rerender previously largest  tiles

    private async largestClusterAPIcallback(val: Response){
        let largestCluster = await val.json() as string[];

        if(largestCluster == null) // casting error
        {return;}     //TODO: define with stakeholder whether to throw an error here    
        
        if(this.currentLargestCluster != null){
            this.currentLargestCluster.map(tileID => {
                let tile = this.state.tilesTmpModel.get(tileID);
                tile.cluster = "";
                this.rerenderTile(tileID);
            });
        }
        this.currentLargestCluster = largestCluster;
        
        largestCluster.map(tileID => {
            let tile = this.state.tilesTmpModel.get(tileID);
            tile.cluster = "largest ";
            this.rerenderTile(tileID);
        });   
    }

     

    private rerenderTile(tileID:string){
        let tc = this.state.tileComponentRefs.get(tileID);
        tc.forceUpdate(); // rerender selected tile
    }

    private isDragging:boolean = false;

    // handle when the user draws and goes outside the grid
    private gridPointerLeaveHandler(event:React.PointerEvent<HTMLDivElement>) {
        this.pointerCancelHandler();
    }

    private pointerDownHandler(tileID:string) {
        let t = this.state.tilesTmpModel.get(tileID);
        t.active = !t.active;

        this.rerenderTile(tileID);

        if(!this.isDragging)
            this.isDragging = true;
    }

    private pointerCancelHandler(tileID?:string) {
        if(this.isDragging)
            this.isDragging = false;
    }

    /* return true if isDragging */
    private pointerEnterHandler(tileID:string) {
        if(this.isDragging){
            this.pointerDownHandler(tileID);
        }
    }


    render() {
        console.log("render grid");
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