import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type InputProps<T extends FieldValues> = {
  name: keyof T; 
  type:string;
  placeholder: string;
  register: UseFormRegister<T>; 
  errors: FieldErrors<T>;
  className?: string; 
};