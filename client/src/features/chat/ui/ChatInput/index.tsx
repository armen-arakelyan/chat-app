import React, { useState, ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { TextInput, Button } from '../../../../shared/ui';
import './styles.scss';

interface FormInputProps {
  placeholder: string;
  buttonText: string;
  onSubmit: (value: string) => void;
}

const ChatInput: React.FC<FormInputProps> = ({ placeholder, buttonText, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  }, [inputValue]);

  return (
    <form className="form-input-container" onSubmit={handleSubmit}>
      <TextInput
        placeholder={placeholder}
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        required
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default memo(ChatInput);
