import React from 'react';

import GameController from '../lib/game-controller';
import GameState from '../lib/models/game-state';
import GameBoardTable from '../components/game-board-table';
import GameAsidePregame from '../components/game-aside-pregame';
import { ShipStates, ShipState, ShipTypes } from '../lib/models/ship-state'
import * as Utils from '../lib/utils'

import '../styles/game.css';

export default class Game extends React.Component {
  state = {
    opponentName: null,
    currentUser: {},
    currentLobby: {},
    currentSpinnerState: '⣾',
    spinnerIntervalId: 0,
    pollGameStateId: 0,
    gameState: GameState.SearchingForMatch,
    shipStates: ShipStates,
    selectedShip: null,
    currentHoveredCells: null,
    orientation: null
  }

  componentWillMount() {
    const { currentUser, currentLobby } = this.props.location.state;
    this.setState({ currentUser, currentLobby });
    document.title = `Battleships | ${currentUser.username} vs. ...`;

    const spinnerIntervalId = setInterval(() => {
      const { currentSpinnerState } = this.state;
      this.setState({ currentSpinnerState: Game.newSpinnerState(currentSpinnerState) });
    }, 16 * 3);

    this.setState({
      spinnerIntervalId: spinnerIntervalId
    });
  }

  componentDidMount() {
    const { currentLobby, currentUser } = this.state;
    const pollGameStateId = setInterval(async () => {
      const gamePollPatch = await GameController.pollLobby(currentLobby.lobbyId, currentUser.id);

      if (gamePollPatch.statusCode === 0) {
        const { pollGameStateId, spinnerIntervalId } = this.state;
        clearInterval(pollGameStateId);
        clearInterval(spinnerIntervalId);

        this.setState({ opponentName: gamePollPatch.opponentName });
        this.setState({ pollGameStateId: null });
        this.setState({ spinnerIntervalId: null });
        this.setState({ gameState: GameState.Pregame });
        document.title = `Battleships | ${currentUser.username} vs. ${gamePollPatch.opponentName}`;
      }
    }, 500);

    this.setState({
      pollGameStateId
    });
  }

  static newSpinnerState(currentSpinner) {
    const possibilites = '⣾⣽⣻⢿⡿⣟⣯⣷⠁⠂⠄⡀⢀⠠⠐⠈';
    const currentIndex = possibilites.indexOf(currentSpinner);
    return possibilites[currentIndex === possibilites.length - 1 ? 0 : currentIndex + 1];
  }

  get enemyName() {
    const { opponentName, currentSpinnerState } = this.state;
    return !!opponentName ? opponentName : `${currentSpinnerState}`;
  }

  _changeSelectedShip = idx => {
    const { selectedShip: currentIdx, orientation } = this.state;

    if (currentIdx === idx) {
      switch (orientation) {
        case 'N':
          this.setState({ orientation: 'E' });
          break;
        case 'E':
          this.setState({ orientation: 'S' });
          break;
        case 'S':
          this.setState({ orientation: 'W' });
          break;
        case 'W':
          this.setState({ orientation: 'N' });
          break;
        default:
          this.setState({ orientation: null });
      }
    } else {
      this.setState({ orientation: 'N' });
      this.setState({ selectedShip: idx });
    }
  }

  _onYourCellClicked = (x, y) => { // very logic heavy, writing this beforehand but I know I will need to refactor
    const { state } = this;
    console.log('cell: ', x, y, ' was clicked.');

    if (state.gameState === GameState.Pregame && state.selectedShip !== null) { // if placing down ship, then...
      console.log('placing down ship');

      const { shipStates, selectedShip, orientation } = state;

      const newShipStates = shipStates.mergeIn([selectedShip], { x, y, orientation });

      this.setState({ shipStates: newShipStates });
      this.setState({ selectedShip: null });
      this.setState({ currentHoveredCells: null });
    } else {
      return false;
    }
  }

  _startCellHovered = (x, y) => {
    const { selectedShip, gameState, orientation } = this.state;

    if (selectedShip && gameState === GameState.Pregame) {
      const shipTypesList = ShipTypes.toList();
      const indexOf = shipTypesList.get(selectedShip);

      this.setState({ currentHoveredCells: new ShipState({ type: indexOf, x, y, orientation }).cells });
    }
  }

  _endCellHovered = (x, y) => {
    const { selectedShip, gameState, currentHoveredCells } = this.state;
    if (selectedShip && gameState === GameState.Pregame && currentHoveredCells) {
      // this.setState({ currentHoveredCells: null });
    }
  }

  get _cellsState() {
    const { shipStates, currentHoveredCells } = this.state;
    const filtered = shipStates.filter(x => x.placed);

    const shipCells = filtered.map(ship => {
      return ship.cells.map(cell => ({
        x: cell.x,
        y: cell.y,
        type: 'SHIP',
        class: 'Game_board_cell--ship'
      }));
    });

    let hoveredCells = null;

    if (!!currentHoveredCells) {
      console.log(currentHoveredCells);
      hoveredCells = currentHoveredCells.map(cell => ({
        x: cell.x,
        y: cell.y,
        type: 'HOVER',
        class: 'Game_board_cell--hover'
      }));

      const vectorShipCells = shipCells.map(cell => ({ x: cell.x, y: cell.y })).toArray();
      const vectorHoveredCells = hoveredCells.map(cell => ({ x: cell.x, y: cell.y }));

      if (Utils.intersects(vectorShipCells, vectorHoveredCells)) {
        hoveredCells = hoveredCells.map(cell => ({
          x: cell.x,
          y: cell.y,
          type: 'SHIP_HOVER',
          class: 'Game_board_cell--error'
        }));
      }
    }

    let returnVal = shipCells;

    if (!!hoveredCells) {
      returnVal = shipCells.concat(hoveredCells);
    }
    return Utils.shallowFlatten(returnVal);
  }

  render() {
    const { username } = this.state.currentUser;
    const { gameState, shipStates, selectedShip, orientation } = this.state;
    const { lobbyName } = this.state.currentLobby;

    return (
      <div className="Game_container">
        <main className="Game_main">
          <h1 className="Game_title">battleships.</h1>
          <h2 className="Game_vs-tag">{username} vs. {this.enemyName}.</h2>
          <div className="Game_boards">
            <GameBoardTable
              cellClicked={this._onYourCellClicked}
              cellsState={this._cellsState}
              state={gameState}
              ships={shipStates.filter(x => x.placed)}
              selectedShip={selectedShip}
              startCellHovered={this._startCellHovered}
              endCellHovered={this._endCellHovered}
              className="Game_board" />
            <GameBoardTable
              state={gameState}
              faded={true}
              className="Game_board" />
          </div>
        </main>
        <div className="Game_aside">
          <h2 className="Game_subtitle Game_subtitle--aside">{lobbyName}</h2>
          {{
            [GameState.Pregame]: (
              <GameAsidePregame
                orientation={orientation}
                selectedShip={selectedShip}
                changeSelectedShip={this._changeSelectedShip}
                ships={shipStates} />
            )
          }[gameState]
          }
        </div>
      </div>
    );
  }
};