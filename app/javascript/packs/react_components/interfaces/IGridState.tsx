import ITile from './ITile';

export default interface IGridState {
    tilesTmpModel: Map<string, ITile>;
    tileComponentRefs: Map<string, React.Component>;
}