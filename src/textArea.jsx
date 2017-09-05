import React from 'react';

export default function TextArea({ text, onTextClick }) {
  const lines = text.content;
  if (lines.length === 0) {
    return <div></div>
  } else {
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
}
