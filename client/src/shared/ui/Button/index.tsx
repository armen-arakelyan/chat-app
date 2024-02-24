import React from 'react';
import './styles.scss';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => (
  <button type={type} className='button' onClick={onClick}>{children}</button>
);

export default Button;
