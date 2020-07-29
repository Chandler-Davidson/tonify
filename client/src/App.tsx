import React from 'react';
import { Switch, Route, Router, RouteComponentProps } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import { KeyboardPage } from './pages/keyboardPage';
import { PlayerPage } from './pages/player';

function App({ history }: RouteComponentProps) {
  return (
    <Router history={history}>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route path="/:id?">
              <KeyboardPage />
            </Route>
          </Switch>

        </header>
      </div >
    </Router>


  );
}

export default App;

