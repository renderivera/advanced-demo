import * as React from 'react';
import {ITileProps, ITile} from './ITileProps';

export default class Tile extends React.Component<ITileProps> {
    constructor(props:ITileProps){
        super(props);

        this.data = props.containerState.tilesTmpModel.get(props.id);
        props.containerState.tileComponentRefs.set(this.props.id, this);
    }

    private readonly data: ITile;

    render() {       
        console.log(`render tile: ${this.props.id}`);
        
        let tileClass = "tile ";

        if(this.data.active)
            tileClass += "active ";

        if(this.data.cluster)
            tileClass += this.data.cluster; //set cluster as string so you could combine multiple cluster


        return(
            <button className={tileClass} 
            onPointerDown={()=>this.props.pointerDownHandler(this.props.id)} 
            onPointerUp={()=>this.props.pointerCancelHandler(this.props.id)} 
            onPointerCancel={()=>this.props.pointerCancelHandler(this.props.id)} 
            onPointerEnter={()=>this.props.pointerEnterHandler(this.props.id)} >
                {this.props.children}
            </button>
        );
    }
}