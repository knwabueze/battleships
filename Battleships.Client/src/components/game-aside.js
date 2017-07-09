import React from 'react';
import * as R from 'ramda';

import ShipLabel from './ship-label';
import GameState from '../lib/models/game-state';
import { ShipMetadatas } from '../lib/models/ship-state'

class GameAside extends React.Component {

  state = {
    ships: R.clone(ShipMetadatas)
  }

  _renderPregame = () => {
    const { ships } = this.state;
    const { selectedShip } = this.props;

    const indexedMap = R.addIndex(R.map);

    const labelMap = indexedMap((type, idx) => <ShipLabel
      key={idx}
      type={type[0]}
      onClick={this._shipLabelClicked}
      selected={type[0] === selectedShip}
      size={type[1].size}
      name={type[1].type} />);

    return R.compose(
      labelMap,
      R.toPairs
    )(ships);
  }

  _shipLabelClicked = type => this.props.changeSelectedShip(type);

  componentWillReceiveProps(nextProps) {
    if (nextProps.placedShips !== this.props.placedShips) {
      const { ships } = this.state;
      const { placedShips } = nextProps;

      const withoutIntersection = R.without(placedShips, ships);

      console.log(withoutIntersection);
      this.setState({
        ships: withoutIntersection
      });
    }
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