"use client";

import { useEffect, useState } from "react";

interface Enrollment {
  id: string;
  student_name: string;
  teacher_name: string;
  status: string;
}

export default function AdminUsers() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    fetch("/api/enrollments/admin", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEnrollments(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/enrollments/admin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment.id === id ? { ...enrollment, status } : enrollment
        )
      );
    } else {
      console.error("Erreur mise à jour du statut");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des élèves en attente</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Élève</th>
            <th className="py-2 px-4 text-left">Professeur</th>
            <th className="py-2 px-4 text-left">Statut</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id} className="border-b">
              <td className="py-2 px-4">{enrollment.student_name}</td>
              <td className="py-2 px-4">{enrollment.teacher_name}</td>
              <td className="py-2 px-4">{enrollment.status}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                  onClick={() => updateStatus(enrollment.id, "accepté")}
                >
                  Accepter
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => updateStatus(enrollment.id, "refusé")}
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}