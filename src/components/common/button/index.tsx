import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './style.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`button ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
