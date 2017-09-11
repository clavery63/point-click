import React from 'react';
import TransitionGrid from './transitionGrid.jsx';

class Transition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 0
    }
    this.animate();
  }

  animate() {
    if (this.state.frame < 14) {
      this.setState({ frame: this.state.frame + 1 });
      window.setTimeout(() => this.animate(), 80);
    } else {
      this.props.onTransitionEnd(this.props.text);
    }

    if (this.state.frame === 7) {
      this.props.onTransitionMid(this.props.toRoom);
    }
  }

  render() {
    return (
      <div className='transition'>
        <TransitionGrid frame={this.state.frame} direction={this.props.dir} />
      </div>
    )
  }
}

export default Transition;
