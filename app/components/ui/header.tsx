"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) return null; // Si pas connecté, on ne montre rien

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        🎵 École de Musique
      </h1>

      <nav className="flex space-x-4">
        {session.user.role === "student" && (
          <>
            <Link href="/student/courses" className="hover:underline">Cours</Link>
            <Link href="/student/progress" className="hover:underline">Progression</Link>
          </>
        )}

        {session.user.role === "teacher" && (
          <>
            <Link href="/teacher/courses" className="hover:underline">Cours</Link>
            <Link href="/teacher/students" className="hover:underline">Eleves</Link>
            <Link href="/teacher/evaluations" className="hover:underline">Évaluations</Link>
          </>
        )}

        {session.user.role === "admin" && (
          <>
            <Link href="/admin/users" className="hover:underline">Utilisateurs</Link>
            <Link href="/admin/reports" className="hover:underline">Paramètres</Link>
          </>
        )}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
      >
        Déconnexion
      </button>
    </header>
  );
}
