"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    };
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession(); // Récupérer la session
  const router = useRouter();

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, redirigez-le en fonction de son rôle
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "student") {
        router.push("/student/courses");
      } else if (session.user.role === "teacher") {
        router.push("/teacher/courses");
      } else if (session.user.role === "admin") {
        router.push("/admin/users");
      }
    }
  }, [status, session, router]);

  const handleLogin = async () => {
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });  
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleLogin} className="w-full">Se connecter</button>
      </div>
    </div>
  );
}