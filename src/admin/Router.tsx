import React from 'react';
import {
  BrowserRouter, Switch, Route, useRouteMatch,
} from 'react-router-dom';
import AdminContainer from './AdminContainer';
import ConfigPage from './ui/config';
import GameLayout from './ui/config/gameLayout';
import Home from './ui/home/Home';
import useAuth from './ui/hooks/useAuth';
import EditRoom from './ui/rooms/EditRoom';
import ListRooms from './ui/rooms/ListRooms';
import AuthForm from './ui/shared/AuthForm';

type Props = {
  gameName: string;
};
const Router = ({ gameName }: Props) => {
  const { authorize, isAuthorized } = useAuth(gameName);
  const { path } = useRouteMatch();

  if (!isAuthorized) {
    return <AuthForm gameName={gameName} onSubmit={authorize} />;
  }

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
  );
};

export default Router;
