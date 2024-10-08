// Input.tsx
import React from 'react';
import { InputProps } from './Input.types';

const Input: React.FC<InputProps> = ({ name, placeholder, register, errors, className, type }) => ( 
  <>
    <input
      type={type} // Agrega esto para usar el tipo de entrada
      className={`${className} ${errors[name] ? 'border-accent' : 'border-gray-300'}`}
      {...register(name)}
      placeholder={placeholder}
    />
    {errors[name] && <p className="text-accent">{errors[name].message}</p>}
  </>
);

export default Input;
