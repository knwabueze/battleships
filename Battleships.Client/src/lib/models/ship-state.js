export class ShipMetadata {
    constructor(type, size, selected = false) {
        this.type = type;
        this.size = size;
        this.selected = selected;
    }
}

export const ShipMetadatas = {
    aircraftCarrier: new ShipMetadata('Aircraft Carrier', 5),
    battleship: new ShipMetadata('Battleship', 4),
    cruiser: new ShipMetadata('Cruiser', 3),
    submarine: new ShipMetadata('Submarine', 3),
    destroyer: new ShipMetadata('Destroyer', 2)
};