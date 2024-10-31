// frontend/src/components/ui/input.js
import React from 'react';

function Input({ name, value, onChange, placeholder, required }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: 'calc(100% - 16px)',
      }}
    />
  );
}

export default Input;

