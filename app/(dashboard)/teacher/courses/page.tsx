"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  instrument: string;
  level: string;
}

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des cours");
        }
        return res.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cours:", error);
        setLoading(false);
      });
  }, []); // Assurez-vous que ce tableau est vide


  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("ID du cours manquant");
      return;
    }
    
    if (!confirm("Voulez-vous vraiment supprimer ce cours ?")) return;

    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression du cours");
      }
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du cours:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des cours</h1>

      {/* Bouton pour ajouter un cours */}
      <button
        onClick={() => router.push("/teacher/courses/new")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Ajouter un cours
      </button>

      {loading ? (
        <p>Chargement des cours...</p>
      ) : (
        <>
          {courses.length === 0 ? (
            <p>Aucun cours trouvé. Ajoutez un cours en cliquant sur le bouton ci-dessus.</p>
          ) : (
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <h2 className="font-semibold">{course.title}</h2>
                    <p>{course.instrument} - {course.level}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        console.log("Éditer le cours avec ID:", course.id); // Ajoutez un log ici aussi
                        router.push(`/teacher/courses/edit/${course.id}`);
                      }}
                      className="bg-yellow-500 px-3 py-1 text-white rounded mr-2"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 px-3 py-1 text-white rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}