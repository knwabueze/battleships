import React from 'react';

import GameController from '../lib/game-controller';
import GameState from '../lib/game-state';
import GameBoardTable from '../components/game-board-table';

import './game.css';

export default class Game extends React.Component {
    state = {
        opponentName: null,
        currentUser: {},
        currentLobby: {},
        currentSpinnerState: '⣾',
        spinnerIntervalId: 0,
        pollGameStateId: 0,
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

    render() {
        const { username } = this.state.currentUser;
        return (
            <div className="Game_container">
                <h1 className="Game_title">battleships.</h1>
                <h2 className="Game_vs-tag">{username} vs. {this.enemyName}</h2>
                <div className="Game_boards">
                    <GameBoardTable className="Game_board" />
                    <GameBoardTable className="Game_board" />
                </div>
            </div>
        );
    }
};