import React from 'react';

const Home = ({ gameName, counter, togglePreview }) => {
  return (
    <div>
      <div>GameName: {gameName}</div>
      <button onClick={togglePreview}>toggle preview</button>
    </div>
  );
};

export default Home;
