import React from 'react';

import '../styles/home.css';

import * as Utils from '../lib/utils';
import HomeController from '../lib/home-controller';

export default class Home extends React.Component {

    state = {
        textbox: ""
    };

    onClicked = e => {
        const command = Utils.snakeToCamel(e.target.id);
        HomeController.execute(command, this.state.textbox, this.props.history);
    }

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
                        id="create-lobby"
                        onClick={this.onClicked}
                        className="Home_button Home_button--first-child">Create Lobby</button>
                    <button
                        id="join-lobby"
                        onClick={this.onClicked}
                        className="Home_button">Join Lobby</button>
                </div>
            </div>
        );
    }
}