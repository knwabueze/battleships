import React from 'react';
import '../styles/join.css';

import JoinTable from '../components/join-table'
import JoinController from '../lib/join-controller';

export default class Join extends React.Component {
    state = {
        lobbies: []
    }

    async componentDidMount() {
        const results = await JoinController.fetchLobbies();
        console.log(results);
        this.setState({ lobbies: results });
    }

    onRowClicked = async e => {
        if (!!e.target.parentNode.dataset.id) { // Check if td is clicked directly, not if tr was clicked
            const { dataset } = e.target.parentNode;
            const { location: { state: { currentUser, currentUser: { id: userId } } }, history } = this.props;

            const statusCode = await JoinController.joinLobby(dataset.id, userId);

            if (statusCode === 0) {
                const currentLobby = {
                    lobbyId: dataset.id,
                    createdAt: dataset.createdAt,
                    hostUsername: dataset.hostName,
                    lobbyName: dataset.lobbyName
                }
                history.push("/game", {
                    currentUser,
                    currentLobby
                });
            }
        }
    }

    render() {
        const { lobbies } = this.state;
        return (
            <div className="Join_container">
                <h1 className="Join_title">join a lobby.</h1>
                {lobbies.length > 0 ? <JoinTable
                    onRowClicked={this.onRowClicked}
                    lobbies={lobbies} /> : null}
            </div>
        );
    }
};