import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ConditionalRoute from './components/conditional-route';

import Home from './containers/home';
import Join from './containers/join';
import Create from './containers/create';
import Game from './containers/game';

class App extends Component {
  static isUserSignedIn() {
    return !!window.history.state &&
      !!window.history.state.state &&
      !!window.history.state.state.currentUser;
  }

  static isUserSignedInAndJoined() {
    return App.isUserSignedIn() &&
      !!window.history.state.state.currentLobby;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ConditionalRoute
            condition={App.isUserSignedIn}
            path="/join"
            exact={true}
            component={Join} />

          <ConditionalRoute
            condition={App.isUserSignedIn}
            path="/create"
            exact={true}
            component={Create}
          />

          <ConditionalRoute
            condition={App.isUserSignedInAndJoined}
            path="/game"
            exact={true}
            component={Game}
          />

          <Route path="/" exact={true} component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
