import React from 'react';
import './styles.scss';

interface TextInputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, required }) => (
  <input
    className="text-input"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
  />
);

export default TextInput;
