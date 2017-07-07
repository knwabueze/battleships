import React from 'react';
import { clone, lensProp, set, map, addIndex, compose, values, find, propEq } from 'ramda';

import ShipLabel from './ship-label';
import GameState from '../lib/models/game-state';
import { ShipMetadatas } from '../lib/models/ship-state'

class GameAside extends React.Component {

  state = {
    ships: clone(ShipMetadatas)
  }

  _renderPregame = () => {
    const { ships, selectedShip } = this.state;

    const indexedMap = addIndex(map);

    const labelMap = indexedMap((type, idx) => <ShipLabel
      key={idx}
      type={type.type}
      onClick={this._shipLabelClicked}
      selected={[type] === selectedShip}
      size={type.size}
      name={type.type} />);

    return compose(
      labelMap,
      values
    )(ships);
  }

  _shipLabelClicked = type => {
    const { ships } = this.state;
    
    const ship = find(propEq('type', type))(ships);
    const shipLens = lensProp();

    this.setState({
      ships: set(shipLens, ship.toggleSelected(), ships),
      selectedShip: type
    });
  }

  render() {
    const { gameState } = this.props;
    return <div className="Game_aside_container--pregame">
      <ul className="Game_list Game_list--pregame">
        {
          {
            [GameState.Pregame]: this._renderPregame()
          }[gameState]
        }
      </ul>
    </div>
  }
};

export default GameAside;