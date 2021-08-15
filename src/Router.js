import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlayRoute from './PlayRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/play/:gameName'>
          <PlayRoute />
        </Route>
        <Route path='/'>
          <div>nah</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
