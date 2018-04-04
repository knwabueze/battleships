import * as R from 'ramda';

function chunk(chunkSize) {
  return function (Array) {
    const arr = [];
    for (let i = 0; i < Array.length; i += chunkSize) {
      arr.push(Array.slice(i, i + chunkSize));
    }

    return arr;
  }
}

export class Cell {
  constructor(x, y, metadata = CellMetadatas.WATER) {
    this.x = x;
    this.y = y;
    this.metadata = metadata;
    Object.freeze(this);
  }

  static setMetadata(CellState, metadata) {
    return new Cell(CellState.x, CellState.y, metadata);
  }
}

export class CellMetadata {
  constructor(type, classes, lastType = null) {
    this.type = type;
    this.lastType = lastType;

    if (classes.indexOf('Game_board_cell') === -1) {
      classes.push('Game_board_cell');
    }

    this.classes = classes;
  }
}

export const CellMetadatas = {
  SHIP: new CellMetadata('SHIP', ['Game_board_cell--ship']),
  WATER: new CellMetadata('WATER', []),
  HOVER: new CellMetadata('HOVER', ['Game_board_cell--hover']),
  ERROR: new CellMetadata('ERROR', ['Game_board_cell--error'])
};

export class Board {
  constructor(width, height) {
    this.cellSet = R.times(row => R.times(column => new Cell(column + 1, row + 1), width), height);
    this.width = width;
    this.height = height;
  }

  static violatesCellPlacement(BoardState, x, y) {
    const cell = Board.getCell(BoardState, x, y);

    if (Board.violatesBoundsPlacement(BoardState, x, y)) {
      return true;
    }

    if (cell.metadata.type === 'SHIP') {
      console.log('SHOULD HIT');
      return true;
    }

    return false;
  }

  static hoverEnd(BoardState) {
    const mapHoverOrError = cell =>
      (cell.metadata.type === 'HOVER' || cell.metadata.type === 'ERROR')
        ? Cell.setMetadata(cell, CellMetadatas.WATER)
        : cell;

    const cellMap = R.compose(
      chunk(BoardState.height),
      R.map(mapHoverOrError),
      R.flatten
    );

    const newBoardState = R.clone(BoardState);
    newBoardState.cellSet = cellMap(BoardState.cellSet);

    return newBoardState;
  }

  static fromJson(json) {
    const board = new Board(json.width, json.height);
    
    /** 
     * Transform 
     * 
     * 
    */
  }

  static violatesBoundsPlacement(BoardState, x, y) {
    if (x > BoardState.width || y > BoardState.height || y < 0 || x < 0) {
      return true;
    }

    return false;
  }

  static projectionViolates(BoardState, x, y, ori, size, violation) {
    const cellViolatesPlacement = violation.bind(null, BoardState);
    let returnValue = false;

    switch (ori) {
      case 'N':
        R.times(n => {
          returnValue = cellViolatesPlacement(x, y + n);
        }, size)
        break;
      case 'E':
        R.times(n => {
          returnValue = cellViolatesPlacement(x - n, y);
        }, size)
        break;
      case 'S':
        R.times(n => {
          returnValue = cellViolatesPlacement(x, y - n);
        }, size)
        break;
      case 'W':
        R.times(n => {
          returnValue = cellViolatesPlacement(x + n, y);
        }, size)
        break;
      default:
        throw new TypeError('Ori must be values of: N, E, S, or W.')
    }

    return returnValue;
  }

  static violatesShipProjectionPlacement(BoardState, x, y, ori, size) {
    return Board.projectionViolates(BoardState, x, y, ori, size, Board.violatesCellPlacement);
  }

  static violatesBoundsProjectionPlacement(BoardState, x, y, ori, size) {
    return Board.projectionViolates(BoardState, x, y, ori, size, Board.violatesBoundsPlacement);
  }

  static setCellMetadata(BoardState, x, y, metadata) {
    if (y > BoardState.height || x > BoardState.width || y < 0 || x < 0) {
      return BoardState;
    }

    const cellLens = R.lensPath(['cellSet', y - 1, x - 1]);
    const cellView = R.view(cellLens, BoardState);

    const recreate = R.compose(
      R.assoc('__proto__', Board.prototype),
      R.set(cellLens, Cell.setMetadata(cellView, metadata))
    );

    return recreate(BoardState);
  }

  static getShipIsProjected(BoardState) {
    const cellSetLens = R.lensProp('cellSet');

    const cellSet = R.compose(
      R.flatten,
      R.view(cellSetLens)
    )(BoardState);

    return R.filter(R.propEq('metadata', CellMetadatas.HOVER), cellSet).length > 0;
  }

  static placeShip(BoardState, x, y, orientation, size) {
    return Board.projectShip(BoardState, x, y, orientation, size, CellMetadatas.SHIP);
  }

  static projectShip(BoardState, x, y, orientation, size, metadata) { // needs to definitely be optimized
    let currentBoard = R.clone(BoardState);

    switch (orientation) {
      case 'N':
        R.times(n => currentBoard = Board.setCellMetadata(currentBoard, x, y + n, metadata), size);
        break;
      case 'E':
        R.times(n => currentBoard = Board.setCellMetadata(currentBoard, x - n, y, metadata), size);
        break;
      case 'S':
        R.times(n => currentBoard = Board.setCellMetadata(currentBoard, x, y - n, metadata), size);
        break;
      case 'W':
        R.times(n => currentBoard = Board.setCellMetadata(currentBoard, x + n, y, metadata), size);
        break;
      default:
        throw new TypeError("Orientation must be values: N, E, S, or W")
    }

    return currentBoard;
  }

  static getCell(Board, x, y) {
    const cell = R.lensPath(['cellSet', y - 1, x - 1]);
    return R.view(cell, Board);
  }
}