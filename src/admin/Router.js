import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import HomeContainer from './ui/home/HomeContainer';

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
          <HomeContainer gameName={gameName} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
