import React from 'react';
import {
  BrowserRouter, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import AdminContainer from './AdminContainer';
import ConfigPage from './ui/config';
import GameLayout from './ui/config/gameLayout';
import Home from './ui/home/Home';
import EditRoom from './ui/rooms/EditRoom';
import ListRooms from './ui/rooms/ListRooms';
import AuthGate from './ui/shared/AuthGate';

type Props = {
  gameName: string;
};
const Router = ({ gameName }: Props) => {
  const { path } = useRouteMatch();

  return (
    <AuthGate gameName={gameName}>
      <BrowserRouter>
        <AdminContainer>
          <Switch>
            <Route path={`${path}/rooms/:roomId`}>
              <EditRoom />
            </Route>
            <Route path={`${path}/rooms`}>
              <ListRooms />
            </Route>
            <Route path={`${path}/config/ui`}>
              <GameLayout />
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
    </AuthGate>
  );
};

export default Router;
