import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Bienvenue à l'École de Musique</h1>
      <nav className="space-x-4">
        <Link href="/login" className="text-blue-600 hover:underline text-lg">Se connecter</Link>
        <Link href="/register" className="text-blue-600 hover:underline text-lg">S'inscrire</Link>
      </nav>
    </div>
  );
}