import React from 'react';

import GameAsideShipRepresentation from './game-aside-ship-representation';
import * as Utils from '../lib/utils'

class GameAsidePregame extends React.Component {
  render() {
    const { ships, changeSelectedShip, orientation, selectedShip } = this.props;

    return <div className="Game_aside_container--pregame">
      <ul className="Game_list Game_list--pregame">
        {ships && ships
          .filter(ship => !ship.placed)
          .map(ship => <GameAsideShipRepresentation
            key={ships.indexOf(ship)}
            selected={selectedShip === ships.indexOf(ship)}
            idx={ships.indexOf(ship)}
            onClick={changeSelectedShip}
            size={ship.type.length}
            name={ship.type.name} />)}
      </ul>
      {Utils.elongateOrientation(orientation)}
    </div>
  }
};

export default GameAsidePregame;