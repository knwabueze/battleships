import React from 'react';

import GameController from '../lib/game-controller';
import GameState from '../lib/models/game-state';
import GameBoard from '../components/game-board';
import GameAside from '../components/game-aside';

import '../styles/game.css';

export default class Game extends React.Component {
  state = {
    opponentName: null,
    currentUser: {},
    currentLobby: {},
    currentSpinnerState: '⣾',
    spinnerIntervalId: 0,
    pollGameStateIntervalId: 0,
    gameState: GameState.SearchingForMatch
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
        this.setState({ pollGameStateIntervalId: null });
        this.setState({ spinnerIntervalId: null });
        this.setState({ gameState: GameState.Pregame });
        document.title = `Battleships | ${currentUser.username} vs. ${gamePollPatch.opponentName}`;
      }
    }, 500);

    this.setState({
      pollGameStateId
    });
  }

  componentWillUnmount() {
    const { spinnerIntervalId, pollGameStateIntervalId } = this.state;

    if (!!spinnerIntervalId) clearInterval(spinnerIntervalId);
    if (!!pollGameStateIntervalId) clearInterval(pollGameStateIntervalId);
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

  render() {
    const { username } = this.state.currentUser;
    const { gameState } = this.state;
    const { lobbyName } = this.state.currentLobby;

    return (
      <div className="Game_container">
        <main className="Game_main">
          <h1 className="Game_title">battleships.</h1>
          <h2 className="Game_vs-tag">{username} vs. {this.enemyName}.</h2>
          <div className="Game_boards">
            <GameBoard />
            <GameBoard faded={true} />
          </div>
        </main>
        <div className="Game_aside">
          <h2 className="Game_subtitle Game_subtitle--aside">{lobbyName}</h2>
          {
            {
              [GameState.Pregame]: (
                <GameAside />
              )
            }[gameState]
          }
        </div>
      </div>
    );
  }
};