import React, { useRef, useEffect, useState } from 'react';
import { connect, ReactReduxContext, Provider } from 'react-redux';
import { Stage } from 'react-konva';
import MainLayer from './MainLayer';
import VideoContainer from '../rtctest/VideoContainer';

const pixelWidth = 256;
const pixelHeight = 240;
const horizStretch = 1.13;
const aspectRatio = (pixelHeight / (pixelWidth * horizStretch));
const paddingFactor = 1;

const calculateSize = stage => {
  const { innerHeight, innerWidth } = window;
  const fullWidth = Math.min(innerHeight / aspectRatio, innerWidth);
  const width = fullWidth * paddingFactor;
  const height = width * aspectRatio;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  stage.content.style.left = `${left}px`;
  stage.content.style.top = `${top}px`;

  return width;
};

const App = ({ setStageData, loading, menu }) => {
  // const stageRef = useRef(null);
  // const [width, setWidth] = useState(0);
  // const scaleX = width / pixelWidth;
  // const scaleY = scaleX / horizStretch;

  // useEffect(() => {
  //   setWidth(calculateSize(stageRef.current));
  //   const resize = () => setWidth(calculateSize(stageRef.current));
  //   window.addEventListener('resize', resize);
  //   return () => window.removeEventListener('resize', resize);
  // }, [stageRef]);

  // useEffect(() => {
  //   if (scaleX) {
  //     setStageData({ stage: stageRef.current, scaleX, scaleY });
  //   }
  // }, [setStageData, stageRef, scaleX, scaleY]);

  // return (
  //   <ReactReduxContext.Consumer>
  //     {({ store }) => (
  //       <Stage
  //         width={width}
  //         height={width * aspectRatio}
  //         scaleX={scaleX}
  //         scaleY={scaleY}
  //         ref={stageRef}
  //       >
  //         <Provider store={store}>
  //           <MainLayer loading={loading} menu={menu} />
  //         </Provider>
  //       </Stage>
  //     )}
  //   </ReactReduxContext.Consumer>
  // );
  const chatMode = window.location.search.indexOf('admin') > -1;
  if (chatMode) {
    return (
      <div className="App">
        <VideoContainer />
      </div>
    );
  }
  return (
    <div className="App">
      <VideoContainer hasVideo={false} />
    </div>
  );
};

const mapStateToProps = ({ loading, menu }) => ({ loading, menu });
const mapDispatchToProps = {
  setStageData: payload => ({ type: 'STAGE_DATA', payload })
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
