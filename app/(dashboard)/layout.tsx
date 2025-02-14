"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!session) {
    return null;
  }

  if (session.user.role === "student") {
    return (
      <div>
        {children}
      </div>
    );
  }

  if (session.user.role === "teacher") {
    return (
      <div>
        {children}
      </div>
    );
  }

  if (session.user.role === "admin") {
    return (
      <div>
        {children}
      </div>
    );
  }

  return null; // Par défaut, ne rien afficher si le rôle n'est pas reconnu
}
