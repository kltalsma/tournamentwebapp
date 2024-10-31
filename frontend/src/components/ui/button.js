// frontend/src/components/ui/button.js
import React from 'react';

function Button({ type, children, style }) {
  return (
    <button type={type} style={{ padding: '10px', borderRadius: '5px', ...style }}>
      {children}
    </button>
  );
}

export default Button;

