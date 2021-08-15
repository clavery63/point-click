import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import Home from './ui/Home';

const Router = () => {
  const { path, url } = useRouteMatch();
  const { gameName } = useParams();

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${path}/rooms`}>
          rooms!
        </Route>
        <Route path='/'>
          <Home gameName={gameName} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
