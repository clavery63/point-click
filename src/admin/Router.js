import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom';

const Router = () => {
  const { path, url } = useRouteMatch();
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${path}/rooms`}>
          rooms!
        </Route>
        <Route path='/'>
          root
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
