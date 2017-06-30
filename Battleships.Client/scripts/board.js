'use strict';

const BattleshipsInstance = (function () {
    class Color extends Uint8ClampedArray {
        constructor(r, g, b, name) {
            super(new ArrayBuffer(3))
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this.name = name;
        }

        get r() { return this[0]; }
        get g() { return this[1]; }
        get b() { return this[2]; }

        set r(value) { this[0] = value; }
        set g(value) { this[1] = value; }
        set b(value) { this[2] = value; }

        toHex(val) {
            const hex = val.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }

        value() {
            return `${toHex(this[0])}${toHex(this[1])}${toHex(this[2])}`;
        }
    }

    class Cell {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.color = new Color(255, 255, 255, "white");
        }

        get color() {
            return color;
        }
    }

    class ShotCell extends Cell {
        constructor(x, y) {
            super(x, y, new Color(255, 0, 0, "red"));
        }
    }

    class ShipCell extends Cell {
        constructor(x, y, type) {
            super(x, y, new Color(0, 0, 255, "blue"));
            this.shipType = type;
        }
    }

    class Board extends Array {
        constructor() {
            super();
            for (let i = 1; i <= 10; i++) {
                for (let j = 1; j <= 10; j++) {
                    this.cell(j, i) = new Cell(j, i);
                }
            }
        }

        placeShot(x, y) {
            if (x > 10 || y > 10 || x < 0 || y < 0)
                return false;

            this.cell(x, y) = new ShotCell();
            return true;
        }

        cell(x, y) {
            return this[((10 * y) + x) - 10];
        }        

        findShip(shipType) {
            const shipCells = [];

            for (let i of this) {
                (i && i.shipType === shipType) && shipCells.push(i);
            }

            return shipCells();
        }

        placeShip(x, y, orientation, size, shipType) {
            for (let i = 0; i < size; i++) {
                switch (orientation) {
                    case 'N': // x stays the same
                        this.cell(x, y + (size * -1)) = new ShipCell(x, y, shipType);
                        break;
                    case 'E': // y stays the same
                        this.cell(x + (size * -1), y) = new ShipCell(x, y, shipType);
                        break;
                    case 'S':
                        this.cell(x, y + (size * 1)) = new ShipCell(x, y, shipType);
                        break;
                    case 'W':
                        this.cell(x + (size * 1), y) = new ShipCell(x, y, shipType);
                        break;
                }
            }
        }
    }

    return {
        Color,
        Cell,
        Board,
        ShotCell,
        ShipCell
    }
})();