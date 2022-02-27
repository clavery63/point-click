import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import React from 'react';

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
      <Link to={`/admin/${gameName}/rooms`}>
        <Typography>To Rooms List</Typography>
      </Link>
      <Link to={`/admin/${gameName}/config`}>
        <Typography>To Config</Typography>
      </Link>
    </div>
  );
};

export default Home;
