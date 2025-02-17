"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCourse() {
  interface Course {
    title: string;
    description: string;
    instrument: string;
    level: string;
  }

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      router.push("/teacher/courses");
    } else {
      alert("Erreur lors de la mise à jour du cours.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!course) return <p>Erreur: le cours n'a pas été trouvé.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Modifier le Cours</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>Nom du Cours</label>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Description</label>
          <textarea
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Instrument</label>
          <input
            type="text"
            value={course.instrument}
            onChange={(e) => setCourse({ ...course, instrument: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label>Niveau</label>
          <input
            type="text"
            value={course.level}
            onChange={(e) => setCourse({ ...course, level: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Sauvegarder les modifications
        </button>
      </form>
    </div>
  );
}
