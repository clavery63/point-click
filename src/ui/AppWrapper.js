import React from 'react';
import VideoContainer from '../rtc/VideoContainer';
import App from './App';

const AppWrapper = () => {
  if (window.location.search.indexOf('admin') > -1) {
    return (
      <div className="App">
        <VideoContainer />
      </div>
    );
  }

  return <App />;
}

export default AppWrapper;
