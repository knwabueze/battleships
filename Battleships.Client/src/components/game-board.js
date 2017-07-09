import React from 'react';
import * as R from 'ramda';

import GameBoardCell from './game-board-cell';
import { CellMetadatas, Board } from '../lib/models/board-state';
import { ShipMetadatas } from '../lib/models/ship-state';
import GameState from '../lib//models/game-state';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardState: new Board(10, 10)
    };
  }

  _onCellHovered = (x, y) => {
    const { boardState } = this.state;
    const { selectedShip } = this.props;

    if (Board.getCell(boardState, x, y).metadata !== CellMetadatas.HOVER && !!selectedShip) {
      const { size } = ShipMetadatas[selectedShip];

      if (Board.violatesShipPlacement(boardState, x, y, 'N', size)) {
        this.setState({
          boardState: Board.projectShip(boardState, x, y, 'N', size, CellMetadatas.ERROR)
        });
      } else {
        this.setState({
          boardState: Board.projectShip(boardState, x, y, 'N', size, CellMetadatas.HOVER)
        });
      }
    }
  }

  _onCellClicked = (x, y) => {
    const { boardState } = this.state;
    const { selectedShip, gameState } = this.props;

    if (!!selectedShip && gameState === GameState.Pregame) {
      if (Board.getShipIsProjected(boardState)) {
        const { size } = ShipMetadatas[selectedShip];

        this.setState({
          boardState: Board.placeShip(boardState, x, y, 'N', size)
        });
      }
    }
  }

  _renderCell = ({ x, y, metadata }) => {
    return <GameBoardCell
      key={(y * 10) + x - 10}
      metadata={metadata}
      onClick={() => this._onCellClicked(x, y)}
      onHover={() => this._onCellHovered(x, y)}
      onHoverEnd={() => this._onCellHoveredEnd(x, y)} />
  }

  _renderRows = data => {
    const mapCells = R.map(this._renderCell);
    const indexedMap = R.addIndex(R.map);

    const mapRows = indexedMap((row, idx) => <tr key={idx}>{mapCells(row)}</tr>);

    return mapRows(data);
  }

  _onCellHoveredEnd = (x, y) => {
    const { boardState } = this.state;
    const { selectedShip } = this.props;

    if (Board.getCell(boardState, x, y).metadata !== CellMetadatas.WATER && !!selectedShip) {
      this.setState({
        boardState: Board.projectShip(boardState, x, y, 'N', ShipMetadatas[selectedShip].size, CellMetadatas.WATER)
      });
    }
  }

  render() {
    const { faded = false } = this.props;
    const { boardState } = this.state;

    return <table className={`Game_board ${faded ? 'Game_board--faded' : ''}`}>
      <tbody>
        {!!boardState ? this._renderRows(boardState.cellSet) : null}
      </tbody>
    </table>
  }
}