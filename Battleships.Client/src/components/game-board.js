import React from 'react';
import { map, addIndex } from 'ramda';

import GameBoardCell from './game-board-cell';
import { CellMetadatas, Board } from '../lib/models/board-state';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardState: new Board(10, 10)
    };
  }

  _onCellHovered = (x, y) => {
    const { boardState } = this.state;

    if (Board.getCell(boardState, x, y).metadata !== CellMetadatas.HOVER) {
      this.setState({
        boardState: Board.setCellMetadata(boardState, x, y, CellMetadatas.HOVER)
      });
    }
  }

  _renderCell = ({ x, y, metadata }) => {
    return <GameBoardCell
      key={(y * 10) + x - 10}
      metadata={metadata}
      onClick={() => { }}
      onHover={() => this._onCellHovered(x, y)}
      onHoverEnd={() => this._onCellHoveredEnd(x, y)} />
  }

  _renderRows = data => {
    const mapCells = map(this._renderCell);
    const indexedMap = addIndex(map);

    const mapRows = indexedMap((row, idx) => <tr key={idx}>{mapCells(row)}</tr>);

    return mapRows(data);
  }

  _onCellHoveredEnd = (x, y) => {
    const { boardState } = this.state;

    if (Board.getCell(boardState, x, y).metadata !== CellMetadatas.WATER) {
      this.setState({
        boardState: Board.setCellMetadata(boardState, x, y, CellMetadatas.WATER)
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