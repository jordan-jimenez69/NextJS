// app/student/progress/page.tsx

"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentProgress() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Rediriger si l'utilisateur n'est pas un étudiant
  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "student") {
      router.push("/login"); // Rediriger vers la page de connexion
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Espace Étudiant</h2>
        <nav>
          <ul className="space-y-2">
            <li>
            <Link
                href="/student/courses"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Cours
              </Link>
            </li>
            <li>
              <Link href="/student/progress" className="block p-2 hover:bg-gray-700 rounded">
                Progression
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Votre Progression</h1>
        <p>Suivez vos progrès dans les cours.</p>
      </main>
    </div>
  );
}
