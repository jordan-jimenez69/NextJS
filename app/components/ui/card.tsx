import { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white p-6 shadow-md rounded-xl ${className}`}>
      {children}
    </div>
  );
}