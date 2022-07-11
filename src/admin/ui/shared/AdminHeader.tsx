import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import TooltipToggle from '../rooms/TooltipToggle';
import SaveButton from './SaveButton';
import PublishButton from './PublishButton';

const getRoomHeading = (path: string) => {
  const pathParts = path.split('/');
  const roomNumber = pathParts[pathParts.length - 1];
  return `Edit Room ${roomNumber}`;
};

const hackilyGetPageHeaderInfo = (gameName: string, path: string) => {
  switch (path) {
    case '':
      return {
        heading: 'Home',
        backText: 'To Games List',
        backLink: '/admin',
        useRealLink: true,
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

type Props = {
  children: React.ReactNode;
  backLink: string;
  useRealLink: boolean;
};
const BackLink = (props: Props) => {
  const { children, backLink, useRealLink } = props;

  if (useRealLink) {
    return (
      <a href={backLink}>{children}</a>
    );
  }

  return <Link to={backLink}>{children}</Link>;
};

const AdminHeader = () => {
  const {
    heading, backText, backLink, useRealLink,
  } = usePageHeaderInfo();
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <BackLink backLink={backLink} useRealLink={!!useRealLink}>
          <Button
            startIcon={<ArrowBack>back</ArrowBack>}
          >
            {backText}
          </Button>
        </BackLink>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center">
          {heading}
        </Typography>
        <SaveButton />
        <PublishButton />
        <TooltipToggle />
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
