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
    </div>
  );
};

export default Home;
