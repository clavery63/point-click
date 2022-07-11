import { Link } from 'react-router-dom';
import React from 'react';
import { Box, Button } from '@mui/material';

type Props = {
  gameName: string;
};
const Home = ({ gameName }: Props) => {
  return (
    <Box style={{ width: '100% ' }}>
      <Link to={`/admin/${gameName}/rooms`}>
        <Button>
          Edit Rooms

        </Button>
      </Link>
      <Link to={`/admin/${gameName}/config`}>
        <Button>
          Edit Config
        </Button>
      </Link>
      <Link to={`/admin/${gameName}/config/ui`}>
        <Button>
          Edit UI
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
