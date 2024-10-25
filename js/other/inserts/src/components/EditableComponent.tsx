import React, { useRef, useState } from 'react';

const EditableComponent = () => {
  const editableRef = useRef(null);
  const [content, setContent] = useState('');
  const [caretPosition, setCaretPosition] = useState(0);

  const handleInput = (event) => {
    setContent(event.target.innerHTML);

    // Update caret position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setCaretPosition(range.startOffset);
    }
  };

  const handleKeyDown = (event) => {
    // You can handle specific key presses here if needed
  };

  const handleKeyUp = (event) => {
    // Update caret position on key up
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setCaretPosition(range.startOffset);
    }
  };

  return (
    <div>
      <div
        ref={editableRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ border: '1px solid black', padding: '10px', minHeight: '100px' }}
      />
      <div>
        <strong>Current Content:</strong> {content}
      </div>
      <div>
        <strong>Caret Position:</strong> {caretPosition}
      </div>
    </div>
  );
};

export default EditableComponent;
