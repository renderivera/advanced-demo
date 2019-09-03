import * as React from 'react';
import  ITileProps from './ITileProps';

interface ITileState{
    active: boolean;
}

export default class Tile extends React.Component<ITileProps,ITileState>
{
    constructor(props:ITileProps){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    public readonly state: ITileState = {
        active: false
    }

    private clickHandler(event:React.PointerEvent<HTMLButtonElement>)
    {
        this.setState({active: !this.state.active});
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
            <button style={style} onPointerDown={this.clickHandler}>{this.props.positionX +','+ this.props.positionY}</button>
        );
    }
}