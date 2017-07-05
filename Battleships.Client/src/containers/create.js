import React from 'react';

import CreateController from '../lib/create-controller';

import '../styles/create.css';

export default class Create extends React.Component {
    state = {
        textbox: ''
    }

    onClick = async () => {
        const { textbox } = this.state;

        if (textbox.trim() !== '' || textbox !== null) {
            const { state: { currentUser, currentUser: { username, id: userId } } } = this.props.location;
            const { history } = this.props;

            const result = await CreateController.createLobby(userId, textbox);

            if (!!result) {
                const currentLobby = {
                    lobbyId: result.lobbyId,
                    createdAt: result.createdAt,
                    hostUsername: username,
                    lobbyName: result.lobbyName
                };
                history.push('/game', {
                    currentUser,
                    currentLobby
                });
            }
        }
    }

    render() {
        return (
            <div className="Create_container">
                <h1 className="Create_title">create a lobby.</h1>
                <div className="Create_textbox">
                    <label className="Create_textbox_label">lobby name</label>
                    <input defaultValue={this.state.textbox}
                        onChange={e => this.setState({ textbox: e.target.value })}
                        className="Create_textbox_input" />
                </div>
                <button onClick={this.onClick}
                    className="Create_button">Search for matches...</button>
            </div>
        );
    }
};