import React from 'react';

import GameController from '../lib/game-controller';
import GameState from '../lib/models/game-state';
import GameBoardTable from '../components/game-board-table';
import GameAsidePregame from '../components/game-aside-pregame';
import { ShipStates } from '../lib/models/ship-state'

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
    selectedShip: null
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

  componentWillUpdate(nextProps, nextState) {
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

  changeSelectedShip = idx => {
    const { selectedShip: currentIdx } = this.state;

    if (currentIdx === idx) {
      this.setState({ selectedShip: null });
    } else {
      this.setState({ selectedShip: idx });
    }
  }

  onYourCellClicked = (x, y) => { // very logic heavy, writing this beforehand but I know I will need to refactor
    const { state } = this;
    console.log('cell: ', x, y, ' was clicked.');

    if (state.gameState === GameState.Pregame && state.selectedShip !== null) { // if placing down ship, then...
      console.log('placing down ship');

      const { shipStates, selectedShip } = state;

      const newShipStates = shipStates.mergeIn([selectedShip], { x, y, orientation: 'W' });

      this.setState({ shipStates: newShipStates });
      this.setState({ selectedShip: null });
    } else {
      return false;
    }
  }

  render() {
    const { username } = this.state.currentUser;
    const { gameState, shipStates, selectedShip } = this.state;
    const { lobbyName } = this.state.currentLobby;

    return (
      <div className="Game_container">
        <main className="Game_main">
          <h1 className="Game_title">battleships.</h1>
          <h2 className="Game_vs-tag">{username} vs. {this.enemyName}.</h2>
          <div className="Game_boards">
            <GameBoardTable
              cellClicked={this.onYourCellClicked}
              state={gameState}
              ships={shipStates.filter(x => x.placed)}
              selectedShip={selectedShip}
              className="Game_board" />
            <GameBoardTable state={gameState} faded className="Game_board" />
          </div>
        </main>
        <div className="Game_aside">
          <h2 className="Game_subtitle Game_subtitle--aside">{lobbyName}</h2>
          {{
            [GameState.Pregame]: (
              <GameAsidePregame
                selectedShip={selectedShip}
                changeSelectedShip={this.changeSelectedShip}
                ships={shipStates} />
            )
          }[gameState]
          }
        </div>
      </div>
    );
  }
};