import * as React from 'react';
import {ITileProps, ITile} from './ITileProps';

export default class Tile extends React.Component<ITileProps> {
    constructor(props:ITileProps){
        super(props);
        this.clickDownHandler = this.clickDownHandler.bind(this);
        this.clickUpHandler = this.clickUpHandler.bind(this);
        this.pointerEnterHandler = this.pointerEnterHandler.bind(this);

        this.data = props.containerState.tilesTmpModel.get(props.id);
    }

    private readonly data: ITile;

    private clickDownHandler(event:React.PointerEvent<HTMLButtonElement>) {
        this.props.pointerDownHandler(this.props.id);
        this.forceUpdate();
    }

    private clickUpHandler(event:React.PointerEvent<HTMLButtonElement>) {
        this.props.pointerCancelHandler(this.props.id);
    }

    private pointerEnterHandler(event:React.PointerEvent<HTMLButtonElement>) {
        if(this.props.pointerEnterHandler(this.props.id))
            this.forceUpdate();
    }

    render() {       
        console.log(`render tile: ${this.props.id}`);

        const style = { backgroundColor: this.data.active ? 'gray' : 'white' };

        return(
            <button style={style} 
            onPointerDown={this.clickDownHandler} 
            onPointerUp={this.clickUpHandler}
            onPointerCancel={this.clickUpHandler}
            onPointerEnter={this.pointerEnterHandler}>
                {this.props.children}
            </button>
        );
    }
}