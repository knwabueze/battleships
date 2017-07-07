import { lensProp, over, compose, assoc, not } from 'ramda';

export class ShipMetadata {
    constructor(type, size, selected = false, x = null, y = null, orientation = null) {
        this.type = type;
        this.size = size;
        this.selected = selected;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    toggleSelected() {
        const activeLens = lensProp('selected');

        const recreate = compose(
            assoc('__prop__', ShipMetadata.prototype),
            over(activeLens, not)
        );

        return recreate(this);
    }

    get active() {
        return !!this.x && !!this.y && !!this.orientation;
    }
}

export const ShipMetadatas = {
    aircraftCarrier: new ShipMetadata('Aircraft Carrier', 5),
    battleship: new ShipMetadata('Battleship', 4),
    cruiser: new ShipMetadata('Cruiser', 3),
    submarine: new ShipMetadata('Submarine', 3),
    destroyer: new ShipMetadata('Destroyer', 2)
};