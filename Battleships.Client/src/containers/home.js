import React from 'react';

import '../styles/home.css';

import HomeController from '../lib/home-controller';

export default class Home extends React.Component {
    state = {
        textbox: ""
    };

    onClicked = cmd => HomeController.execute(cmd, this.state.textbox, this.props.history);

    render() {
        return (
            <div className="Home_container">
                <h1 className="Home_title">battleships.</h1>
                <input
                    onChange={e => this.setState({ textbox: e.target.value })}
                    defaultValue={this.state.textbox}
                    className="Home_textbox" type="text" />
                <div className="Home_buttons">
                    <button
                        onClick={() => this.onClicked("createLobby")}
                        className="Home_button Home_button--first-child">Create Lobby</button>
                    <button
                        onClick={() => this.onClicked("joinLobby")}
                        className="Home_button">Join Lobby</button>
                </div>
            </div>
        );
    }
}