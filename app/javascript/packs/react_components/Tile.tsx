import * as React from 'react';
import  ITileProps from './ITileProps';

interface ITileState{
    active: boolean;
}

export default class Tile extends React.Component<ITileProps,ITileState>
{
    constructor(props:ITileProps){
        super(props);
        this.clickDownHandler = this.clickDownHandler.bind(this);
        this.pointerEnterHandler = this.pointerEnterHandler.bind(this);
    }

    public readonly state: ITileState = {
        active: false
    }

    private static isDragging = false;

    private clickDownHandler(event:React.PointerEvent<HTMLButtonElement>)
    {
        Tile.isDragging = true;
        this.setState({active: !this.state.active});
    }

    private clickUpHandler(event:React.PointerEvent<HTMLButtonElement>)
    {
        Tile.isDragging = false;
    }

    private pointerEnterHandler(event:React.PointerEvent<HTMLButtonElement>)
    {
        if(Tile.isDragging){
            this.clickDownHandler(event);
        }
    }


    componentDidMount()
    {
        
    }


    render()
    {       
        console.log(this);

        let color = '';

        if(this.state.active){
            color = 'gray';
        }
        else{
            color = 'white';
        }
        
        const style = {
            backgroundColor: color
        }

        return(
            <button style={style} 
            onPointerDown={this.clickDownHandler} 
            onPointerUp={this.clickUpHandler}
            onPointerCancel={this.clickUpHandler}
            onPointerEnter={this.pointerEnterHandler}>
                {this.props.positionX +','+ this.props.positionY}
            </button>
        );
    }
}