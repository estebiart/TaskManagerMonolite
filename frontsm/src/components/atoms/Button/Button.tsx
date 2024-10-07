import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ isSubmitting, isDisabled, className, text, ...props }) => (
  <button
    className={`home__button ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'} ${className}`}
    type="submit"
    disabled={isDisabled}
    {...props}
  >
    {isSubmitting ? 'Submitting...' : text}
  </button>
);

export default Button;
