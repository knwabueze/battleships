import * as R from 'ramda';

// Todo later
function deepFreeze(obj) {
}

export class Color extends Uint8ClampedArray {
    constructor(r, g, b) {
        super(new ArrayBuffer(3));
        this[0] = r;
        this[1] = g;
        this[2] = b;
        Object.freeze(this);
    }

    toStyle = () => `color: rgb(${this.r}, ${this.g}, ${this.b})`
}

export class Cell {
    constructor(x, y, metadata = null) {
        this.x = x;
        this.y = y;
        this.metadata = metadata;
        Object.freeze(this);
    }

    /**
     * This class is immutable, this will return a new instance of Cell object
     * 
     * @param {any} metadata 
     * @memberof Cell
    * */
    setMetadata(metadata) {
        return new Cell(this.x, this.y, metadata);
    }
}

export class CellMetadata {
    constructor(type, classes) {
        this.type = type;

        if (classes.indexOf('Game_board_cell') === -1) {
            classes.push('Game_board_cell');
        }

        this.classes = classes;

        deepFreeze(this);
    }
}

export const CellMetadatas = {
    SHIP: new CellMetadata('SHIP', ['Game_board_cell--ship']),
    WATER: new CellMetadata('WATER', []),
    HOVER: new CellMetadata('HOVER', ['Game_board_cell--hover'])
}

export class Board {
    constructor(width, height) {
        const rows = R.range(1, width + 1);
        const columns = R.range(1, height + 1);

        this.cellSet = R.map(
            row => R.map(
                column => new Cell(column, row, CellMetadatas.WATER)
            )(columns)
        )(rows);
    }

    static setCellMetadata(Board, x, y, metadata) {
        const cellLens = R.lensPath(['cellSet', y - 1, x - 1]);
        const cellView = R.view(cellLens, Board);

        const recreate = R.compose(
            R.assoc('__prop__', Board.prototype),
            R.set(cellLens, cellView.setMetadata(metadata))
        );

        return recreate(Board);
    }

    static getCell(Board, x, y) {
        const cell = R.lensPath(['cellSet', y - 1, x - 1]);

        return R.view(cell, Board);
    }
}