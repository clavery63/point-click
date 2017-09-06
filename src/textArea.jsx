import React from 'react';

class TextArea extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { text, setChar, setLine } = nextProps;
    const { content, char, line } = text;
    if (content.length > 0) {
      if (char < content[line].length) {
        window.setTimeout(() => {
          setChar(char + 1);
        }, 40);
      } else if (line < content.length - 1) {
        window.setTimeout(() => {
          setLine(line + 1);
        }, 40);
      }
    }
  }

  renderText() {
    const { text, onTextClick } = this.props;
    const { content, line, char } = text;
    const lines = content.slice(0, line + 1);
    const lastLine = lines[lines.length - 1].slice(0, char + 1);
    lines[lines.length - 1] = lastLine;
    return (
      <div className='text-background' onClick={onTextClick}>
        <div className='text-click-mask'></div>
        <div className='text-area'>
          {lines.map(line => (
            <div className='text-line'>{line}</div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    if (this.props.text.content.length === 0) {
      return <div></div>
    } else {
      return this.renderText()
    }
  }
}

export default TextArea;
