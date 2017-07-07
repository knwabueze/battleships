import React from 'react';

import { CellMetadatas } from '../lib/models/board-state'

export default class GameBoardTable extends React.Component {
  _onCellHovered = (x, y) => {
    const { boardState, updateBoardState } = this.props;

    if (boardState.getCellMetadata(x, y) !== CellMetadatas.HOVER) {
      updateBoardState(boardState.setCellMetadata(x, y, CellMetadatas.HOVER));
    }
  }

  _onCellHoveredEnd = (x, y) => {
    const { boardState, updateBoardState } = this.props;

    if (boardState.getCellMetadata(x, y) !== CellMetadatas.WATER) {
      updateBoardState(boardState.setCellMetadata(x, y, CellMetadatas.WATER));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.boardState !== this.props.boardState;
  }

  render() {
    const { faded = false, boardState } = this.props;

    return <table className={`Game_board ${faded ? 'Game_board--faded' : ''}`}>
      <tbody>
        {!!boardState ? boardState.toJSX(this._onCellHovered, this._onCellHoveredEnd) : null}
      </tbody>
    </table>
  }
}