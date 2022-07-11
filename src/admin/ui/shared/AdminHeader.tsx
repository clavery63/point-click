import {
  AppBar, Button, IconButton, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';

const getRoomHeading = (path: string) => {
  const pathParts = path.split('/');
  const roomNumber = pathParts[pathParts.length - 1];
  return `Room ${roomNumber}`;
};

const hackilyGetPageHeaderInfo = (gameName: string, path: string) => {
  switch (path) {
    case '':
      return {
        heading: 'Home',
        backText: 'To Games List',
        backLink: '/admin',
      };
    case 'rooms':
      return {
        heading: 'Rooms',
        backText: 'To Home',
        backLink: `/admin/${gameName}`,
      };
    case 'config':
      return {
        heading: 'Edit Config',
        backText: 'To Home',
        backLink: `/admin/${gameName}`,
      };
    case 'config/ui':
      return {
        heading: 'Edit UI',
        backText: 'To Home',
        backLink: `/admin/${gameName}`,
      };
    default:
      return {
        heading: getRoomHeading(path),
        backText: 'To Rooms',
        backLink: `/admin/${gameName}/rooms`,
      };
  }
};

const usePageHeaderInfo = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const gameName = pathParts[2];
  const pathSuffix = pathParts.slice(3).join('/');

  return hackilyGetPageHeaderInfo(gameName, pathSuffix);
};

const AdminHeader = () => {
  const { heading, backText, backLink } = usePageHeaderInfo();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
