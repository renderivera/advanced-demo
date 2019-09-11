import IGridState from './IGridState';

export default interface ITileProps {
    id: string;
    containerState: IGridState;
    pointerDownHandler(id:string):void;
    pointerEnterHandler(id:string):void;
    pointerCancelHandler(id:string):void;
}