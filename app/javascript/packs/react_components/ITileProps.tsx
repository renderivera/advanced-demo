export interface ITileProps {
    positionX: number;
    positionY: number;
}

export interface ITile extends ITileProps{
    active?: boolean;
    cluster?: ICluster;
}

export interface ICluster {
    id: string;
    tiles: Array<ITile>;
}
