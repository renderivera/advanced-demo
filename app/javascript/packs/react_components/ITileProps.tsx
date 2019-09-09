export interface ITile {
    x: number;
    y: number;
    active?: boolean;
    cluster?: string;
}

export interface ITileProps {
    id: string;
    containerState: IGridState;
    pointerDownHandler(id:string):void;
    pointerEnterHandler(id:string):void;
    pointerCancelHandler(id:string):void;
}

export interface IGridState {
    tilesTmpModel: Map<string, ITile>;
    tileComponentRefs: Map<string, React.Component>;
}