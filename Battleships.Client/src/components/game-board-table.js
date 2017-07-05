import React from 'react';

import GameState from '../lib/models/game-state';
import * as Utils from '../lib/utils'

const oneToTen = () => {
  const result = [];
  for (let i = 1; i <= 10; i++) {
    result.push(i);
  }
  return result;
}

const isPlacingShip = (selectedShip, state) => (!!selectedShip || selectedShip === 0) && state === GameState.Pregame;
const isShipCell = (x, y, ships) => {
  if (!ships) return false;

  const placedShipCells = Utils.shallowFlatten(ships.map(ship => ship.cells).toJS());
  return placedShipCells.some(cells => cells[0] === x && cells[1] === y);
}

const GameBoardTable = ({ faded, selectedShip, ships, cellClicked, state, className, ...rest }) =>
  <table className={`${className} 
    ${isPlacingShip(selectedShip, state) && 'Game_board--place-ships'} 
    ${faded && 'Game_board--faded'}`} {...rest}>
    <tbody>
      {
        oneToTen().map(y => <tr key={y}>
          {
            oneToTen().map(x => {
              return <td className={isShipCell(x, y, ships) ? 'Game_board_cell--active' : ''}
                onClick={() => cellClicked(x, y)}
                key={(y * 10) + x - 10} />
            })
          }
        </tr>)
      }
    </tbody>
  </table>;

window.isShipCell = isShipCell;
export default GameBoardTable;