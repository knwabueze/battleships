import React from 'react';

const oneToTen = () => {
  const result = [];
  for (let i = 1; i <= 10; i++) {
    result.push(i);
  }
  return result;
}

const GameBoardTable = ({ ...rest }) =>
  <table {...rest}>
    <tbody>
      {
        oneToTen().map(y =>
          <tr key={y} data-y={y}>
            {oneToTen().map(x => <td key={x + (10 * y)}>{x}, {y}</td>)}
          </tr>)
      }
    </tbody>
  </table>;

export default GameBoardTable;