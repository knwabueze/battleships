import { Record, Map, List } from 'immutable';

export const ShipType = Record({ name: '', length: 0 });

export class ShipState extends Record({ type: ShipType, x: null, y: null, orientation: null }) {
  get cells() {
    const result = [];

    for (let i = 0; i < this.type.length; i++) {
      switch (this.orientation) {
        case 'N':
          result.push([this.x, this.y - i]);
          break;
        case 'E':
          result.push([this.x - i, this.y]);
          break;
        case 'S':
          result.push([this.x, this.y + 1]);
          break;
        case 'W':
          result.push([this.x + i, this.y]);
          break;
        default:
          throw new TypeError("Orientation must be of values N, E, S, or W.");
      }
    }

    return result;
  }

  get placed() {
    return !!this.x && !!this.y && !!this.orientation;
  }
}

const ShipTypesMutable = {
  aircraftCarrier: ShipType({ name: 'Aircraft Carrier', length: 5 }),
  battleship: ShipType({ name: 'Battleship', length: 4 }),
  submarine: ShipType({ name: 'Submarine', length: 3 }),
  cruiser: ShipType({ name: 'Cruiser', length: 3 }),
  destroyer: ShipType({ name: 'Destroyer', length: 2 })
}

export const ShipTypes = Map(ShipTypesMutable);

export const ShipStates = List([
  new ShipState({ type: ShipTypes.get("aircraftCarrier") }),
  new ShipState({ type: ShipTypes.get("battleship") }),
  new ShipState({ type: ShipTypes.get("submarine") }),
  new ShipState({ type: ShipTypes.get("cruiser") }),
  new ShipState({ type: ShipTypes.get("destroyer") })
]);