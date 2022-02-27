import React from 'react';
import {
  BrowserRouter, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import AdminContainer from './AdminContainer';
import ConfigPage from './ui/config';
import Home from './ui/home/Home';
import EditRoom from './ui/rooms/EditRoom';
import ListRooms from './ui/rooms/ListRooms';

type Props = {
  gameName: string;
};
const Router = ({ gameName }: Props) => {
  const { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <AdminContainer>
        <Switch>
          <Route path={`${path}/rooms/:roomId`}>
            <EditRoom />
          </Route>
          <Route path={`${path}/rooms`}>
            <ListRooms />
          </Route>
          <Route path={`${path}/config`}>
            <ConfigPage />
          </Route>
          <Route path="/">
            <Home gameName={gameName} />
          </Route>
        </Switch>
      </AdminContainer>
    </BrowserRouter>
  );
};

export default Router;
