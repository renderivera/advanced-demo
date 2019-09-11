import * as React from 'react';
import Tile from './Tile';
import IGridProps from './interfaces/IGridProps';
import IGridState from './interfaces/IGridState';
import ITile from './interfaces/ITile';

export default class TileGrid extends React.Component<IGridProps,IGridState>{

    constructor(props:IGridProps){
        super(props);

        this.submitTiles = this.submitTiles.bind(this);
        this.gridPointerLeaveHandler = this.gridPointerLeaveHandler.bind(this);
        this.pointerDownHandler = this.pointerDownHandler.bind(this);
        this.pointerCancelHandler = this.pointerCancelHandler.bind(this);
        this.pointerEnterHandler = this.pointerEnterHandler.bind(this);
        this.largestClusterAPIcallback = this.largestClusterAPIcallback.bind(this);

        this.initTilesTmpModel();
        this.initGridMatrixLayout();
    }

    public readonly state: IGridState = {
        tilesTmpModel:new Map<string, ITile>(),
        tileComponentRefs: new Map<string, React.Component>()
    };
    private readonly style: React.CSSProperties = {display: 'grid', gridTemplateColumns: null, width: '100%', height: '100%'};
    private fetchRequest: RequestInit = {method: 'post', body: null, headers: { 'Content-type': 'application/json' }};

    private initTilesTmpModel() {
        for (let y = 0; y < this.props.tileCountY; y++) {            
            for (let x = 0; x < this.props.tileCountX; x++) {
                this.state.tilesTmpModel.set(`${x},${y}`, {x: x, y: y})
            }            
        }
    }

    private initGridMatrixLayout() {
        let colTemplate = '';
        for (let index = 0; index < this.props.tileCountX; index++) {
            colTemplate += 'auto '; // add an auto for each x-int / column for dynamic resizing
        }
        this.style.gridTemplateColumns = colTemplate;
    }

    private isLoading = false;

    private async submitTiles(){
        if(this.isLoading)
        return;

        this.isLoading = true;

        let obb = {xCount:this.props.tileCountX, 
            yCount:this.props.tileCountY, 
            tiles:[...this.state.tilesTmpModel]}; // ... spreads contents of Map; necessarry, stringify doesnt work with iterables

        this.fetchRequest.body = JSON.stringify(obb);

        try {
            fetch(this.props.findClusterAPIpath, this.fetchRequest)
            .then(this.largestClusterAPIcallback)
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }

    private async largestClusterAPIcallback(val: Response){
        let largestCluster = await val.json() as string[];

        if(largestCluster == null) // casting error
            return;     //TODO: define with stakeholder whether to throw an error here    
        
        this.resetCurrentLargestCluster(largestCluster)
        
        largestCluster.map(tileID => {
            let tile = this.state.tilesTmpModel.get(tileID);
            tile.cluster = "largest ";
            this.rerenderTile(tileID);
        });   

        this.isLoading = false;
    }

    private currentLargestCluster:string[] = null;
    
    private resetCurrentLargestCluster(largestCluster?:string[]){
        if(this.currentLargestCluster != null){
            this.currentLargestCluster.map(tileID => {
                let tile = this.state.tilesTmpModel.get(tileID);
                tile.cluster = "";
                this.rerenderTile(tileID);
            });
        }
        this.currentLargestCluster = largestCluster; //set to null if no largestCluster parameter provided
    } 

    private rerenderTile(tileID:string){
        let tc = this.state.tileComponentRefs.get(tileID);
        tc.forceUpdate(); // rerender selected tile
    }

    private isDragging:boolean = false;
    private gridPointerLeaveHandler(event:React.PointerEvent<HTMLDivElement>) {
        this.pointerCancelHandler();     // handle when the user drags outside the grid
    }

    private pointerDownHandler(tileID:string) {
        let t = this.state.tilesTmpModel.get(tileID);
        t.active = !t.active;
        
        this.resetCurrentLargestCluster();
        this.rerenderTile(tileID);

        if(!this.isDragging)
            this.isDragging = true;
    }

    private pointerCancelHandler(tileID?:string) {
        if(this.isDragging)
            this.isDragging = false;
    }

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
                <p className="tileText">{key}</p>
            </Tile>
           );
        }

        return(
            <React.Fragment>
                <button className="submitButton" onClick={this.submitTiles}>
                    <p>Find Largest Cluster</p>
                </button>
                <div className="tileGrid" style={this.style} onPointerLeave={this.gridPointerLeaveHandler}>
                    {tiles}
                </div>
            </React.Fragment>
        );
    }
}