"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        router.push("/auth/login");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      setError("Erreur réseau.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleRegister} className="w-full">S'inscrire</button>
      </div>
    </div>
  );
}