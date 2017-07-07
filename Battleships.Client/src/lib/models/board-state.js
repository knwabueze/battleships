import React from 'react';
import * as R from 'ramda';

import GameBoardCell from '../../components/game-board-cell';

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
        const lens = R.lensProp('metadata');
        return R.compose(R.assoc('__proto__', Cell.prototype) ,R.set(lens, metadata))(this);
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
        const rows = R.range(1)(width + 1);
        const columns = R.range(1)(height + 1);

        this.cellSet = R.map(
            row => R.map(
                column => new Cell(column, row, CellMetadatas.WATER)
            )(columns)
        )(rows);

        deepFreeze(this);
    }

    setCellMetadata(x, y, metadata) {
        const cell = R.lensPath(['cellSet', y - 1, x - 1]);
        const cellView = R.view(cell, this);

        return R.set(cell, cellView.setMetadata(metadata), this);
    }

    getCellMetadata(x, y) {
        const cell = R.lensPath(['cellSet', y - 1, x - 1, 'metadata']);
        return R.view(cell, this);        
    }

    toJSX(onHover = () => { }, onHoverEnd = () => { }, onClick = () => { }) {
        const columnsByRow = R.map(cell => <GameBoardCell
            onHover={() => onHover(cell.x, cell.y)}
            onHoverEnd={() => onHoverEnd(cell.x, cell.y)}
            onClick={() => onClick(cell.x, cell.y)}
            metadata={cell.metadata}
            key={(10 * cell.y) + cell.x - 10} />);

        const idxMap = R.addIndex(R.map);
        const rows = idxMap((row, idx) => <tr key={idx + 1}>{columnsByRow(row)}</tr>);

        return rows(this.cellSet);
    }
}

window.Board = new Board(10, 10);   