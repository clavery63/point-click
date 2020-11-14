import React, { useState } from 'react';
import { connect } from 'react-redux';

const runText = (text) => {
  return {
    type: 'RUN_TEXT',
    payload: text
  }
} 

const pageClick = () => {
  return {
    type: 'PAGE_CLICK'
  }
}

const TextInput = connect(null, { pageClick, runText })(({ pageClick, runText }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <textarea onChange={e => setText(e.target.value)} value={text} />
      <button onClick={() => runText(text)}>RUN TEXT</button>
      <button onClick={() => pageClick()}>PAGE CLICK</button>
    </div>
  );
});

export default TextInput;
