"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard/student" className="block p-2 hover:bg-gray-700 rounded">Espace Étudiant</a></li>
            <li><a href="/dashboard/teacher" className="block p-2 hover:bg-gray-700 rounded">Espace Professeur</a></li>
            <li><a href="/dashboard/admin" className="block p-2 hover:bg-gray-700 rounded">Admin</a></li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
