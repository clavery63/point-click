import React from 'react';
import {render} from 'react-dom';
import MainGame from './mainGame.jsx';
import MainMenu from './mainMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'MENU'
    }
  }

  toggleMenu() {
    const { mode } = this.state;
    this.setState({ mode: (mode === 'MENU') ? 'GAME' : 'MENU' });
  }

  renderGameContent() {
    const { mode } = this.state;
    if (mode === 'MENU') {
      return <MainMenu name={this.props.name} />
    } else {
      return <MainGame name={this.props.name} />
    }
  }

  render() {
    return (
      <div>
        <p onClick={this.toggleMenu.bind(this)}>Game mode: {this.state.mode}!</p>
        {this.renderGameContent()}
      </div>
    )
  }
}

render(<App name='Brendan' />, document.getElementById('app'));
