import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
