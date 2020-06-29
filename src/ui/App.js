import React from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import './App.css';
import ViewportContainer from './sections/viewport/ViewportContainer';

const App = () => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Provider store={store}>
            <Layer>
              <Text text='Hi' />
              <ViewportContainer />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default App;
