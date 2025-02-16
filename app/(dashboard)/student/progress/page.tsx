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
    <>
      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Votre Progression</h1>
        <p>Suivez vos progrès dans les cours.</p>
      </main>
    </>
  );
}
