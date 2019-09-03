import * as React from 'react';
import  ITileProps from './ITileProps';

interface ITileState{
    active: boolean;
}

export default class Tile extends React.Component<ITileProps,ITileState>
{
    constructor(props:ITileProps){
        super(props);
    }

    render()
    {
        return(
            <h1>Hello</h1>
        );
    }
}