import { Link } from 'react-router-dom';
import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { ArrowForward } from '@mui/icons-material';

type Props = {
  gameName: string;
};
const Home = ({ gameName }: Props) => {
  return (
    <div>
      <div>
        GameName:
        {' '}
        {gameName}
      </div>
      <Box style={{ width: '100% ' }}>
        <Link to="/admin">
          <Button
            startIcon={<ArrowBack>back</ArrowBack>}
          >
            To Games List
          </Button>
        </Link>
      </Box>
      <Box style={{ width: '100% ' }}>
        <Link to={`/admin/${gameName}/rooms`}>
          <Button
            endIcon={<ArrowForward>back</ArrowForward>}
          >
            To Rooms List

          </Button>
        </Link>
      </Box>
      <Box style={{ width: '100% ' }}>
        <Link to={`/admin/${gameName}/config`}>
          <Button
            endIcon={<ArrowForward>back</ArrowForward>}
          >
            To Config

          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
