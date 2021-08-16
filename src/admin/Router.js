import React from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import AdminContainer from './AdminContainer';
import HomeContainer from './ui/home/HomeContainer';

const Router = ({ gameName }) => {
  const { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      <AdminContainer gameName={gameName}>
        <Switch>
          <Route path={`${path}/rooms`}>
            rooms!
          </Route>
          <Route path='/'>
            <HomeContainer gameName={gameName} />
          </Route>
        </Switch>
      </AdminContainer>
    </BrowserRouter>
  );
};

export default Router;
