export type ButtonProps = {
    isSubmitting: boolean;
    isDisabled: boolean;
    className?: string;
    text: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>; 
  