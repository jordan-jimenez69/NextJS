import { ReactNode } from "react";
import Link from "next/link";
import { Card } from "../components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl">
        <nav className="flex justify-between mb-4">
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </nav>
        {children}
      </Card>
    </div>
  );
}