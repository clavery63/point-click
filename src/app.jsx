import React from 'react';
import {render} from 'react-dom';
import MainGame from './mainGame.jsx';
import MainMenu from './mainMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'MENU',
      items: [
        'torch',
        'key1',
        'pot roast'
      ]
    }
  }

  setMode(mode) {
    this.setState({ mode });
  }

  renderGameContent() {
    const { mode } = this.state;
    if (mode === 'MENU') {
      return <MainMenu
        name={this.props.name}
        goToGame={this.setMode.bind(this, 'GAME')}
      />
    } else {
      return <MainGame
        name={this.props.name}
        goToMenu={this.setMode.bind(this, 'MENU')}
        items={this.state.items}
      />
    }
  }

  render() {
    return (
      <div>
        {this.renderGameContent()}
      </div>
    )
  }
}

render(<App name='Brendan' />, document.getElementById('app'));
