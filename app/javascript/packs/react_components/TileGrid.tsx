import * as React from 'react';
import Tile from './Tile';

interface IGridProps{
    tileCountX:number;
    tileCountY:number;
}

interface IGridState{
    tiles:Array<Tile>;
}

export default class TileGrid extends React.Component<IGridProps,IGridState>{



    componentDidMount(){
        this.setState({tiles: []}); // needed for instatiation
    }


    render() {

        if(this.state == null || this.state.tiles == null)
            return('');           

        const items: Array<Tile> = [];

        for (let x = 0; x < this.props.tileCountX; x++) {
            for (let y = 0; y < this.props.tileCountY; y++) {
                items.push(new Tile({positionX: x, positionY: y}));
            }            
        }      

        const styles = {
            grid: {
                display: 'grid',
                'grid-template-columns': 'auto auto auto auto auto auto auto auto auto auto',
                'justify-content': 'space-evenly'
            }
        };
               
        return(
            <div style={styles.grid}>
                {items.map(tile => 
                    <div key={tile.props.positionX +','+ tile.props.positionY}>
                        {tile.props.positionX +','+ tile.props.positionY}
                    </div>)}
            </div>
        );
    }
}