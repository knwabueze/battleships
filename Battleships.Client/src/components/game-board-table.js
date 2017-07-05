import React from 'react';

export default class GameBoardTable extends React.Component {
  _renderRows = (row, col) => {
    const rows = [];
    for (let y = 1; y <= row; y++) {
      const cells = [];
      for (let x = 1; x <= col; x++) {
        // const types = cellsState
        //   .filter(cell => cell.x === x && cell.y === y)
        //   .map(cell => cell.class);

        cells.push(this._renderCell(x, y));
      }
      rows.push(<tr key={y}>{cells}</tr>);
    }
    return rows;
  }

  _renderCell = (x, y) => {
    const key = (10 * y) + x - 10;
    const { cellClicked, startCellHovered, endCellHovered } = this.props;
    const { cellsState } = this.props;

    let classes = '';

    if (!!cellsState) {
      const matches = cellsState.filter(cell => cell.x === x && cell.y === y);
      classes = `${matches.map(match => match.class).join(" ")}`
    }

    return (
      <td
        key={key}
        className={`Game_board_cell ${classes}`}
        onClick={() => cellClicked(x, y)}
        onMouseEnter={() => startCellHovered(x, y)}
        onMouseLeave={() => endCellHovered(x, y)}
      />
    );
  }

  render() {
    const {
      faded = false,
      className } = this.props;

    return <table className={`${className}  
    ${faded && 'Game_board--faded'}`}>
      <tbody>
        {this._renderRows(10, 10)}
      </tbody>
    </table>
  }
}