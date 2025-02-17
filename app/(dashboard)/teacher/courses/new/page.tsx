"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instrument, setInstrument] = useState("");
  const [level, setLevel] = useState("");
  const [schedule, setSchedule] = useState("");  // Nouvel champ pour l'emploi du temps
  const [capacity, setCapacity] = useState(0);  // Nouvel champ pour la capacité
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const teacherId = "teacher-id"; // Remplacer par l'ID de l'enseignant connecté

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        instrument,
        teacherId,
        level,
        schedule,
        capacity,
      }),
    });

    if (response.ok) {
      router.push("/teacher/courses");
    } else {
      alert("Erreur lors de l'ajout du cours.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ajouter un Cours</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>Nom du Cours</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Instrument</label>
          <input
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Niveau</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Emploi du Temps</label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Capacité</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
            min="1"
            className="block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
