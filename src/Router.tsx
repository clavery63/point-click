import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlayRoute from './PlayRoute';
import Admin from './admin';
import GamesList from './admin/ui/gamesList';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/play/:gameName">
          <PlayRoute />
        </Route>
        <Route path="/admin/:gameName">
          <Admin />
        </Route>
        <Route path="/admin">
          <GamesList />
        </Route>
        <Route path="/">
          <div>welp. welcome to doublehamburger.com</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
