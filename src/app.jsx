import React from 'react';
import MainGame from './mainGame.jsx';
import MainMenu from './mainMenu.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'MENU'
    }
  }

  setMode(mode) {
    this.setState({ mode });
  }

  renderGameContent() {
    const { mode } = this.state;
    if (mode === 'MENU') {
      return <MainMenu
        goToGame={this.setMode.bind(this, 'GAME')}
      />
    } else {
      return <MainGame
        goToMenu={this.setMode.bind(this, 'MENU')}
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
