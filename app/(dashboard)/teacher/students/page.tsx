"use client";

import React from "react";
import { useEffect, useState } from "react";

interface Enrollment {
  id: string;
  enrollmentDate: string;
  status: string;
  student_name: string;
  course_title: string;
}

export default function TeacherStudents() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("/api/enrollments/teacher");
        if (!response.ok) {
          throw new Error("Erreur serveur.");
        }
        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    }
    fetchEnrollments();
  }
    , []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Liste des élèves inscrits</h1>
        {error && <p className="text-red-500">{error}</p>}
        {enrollments.length === 0 ? (
          <p>Aucune inscription trouvée.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Nom de l'élève</th>
                <th className="p-3">Cours</th>
                <th className="p-3">Date d'inscription</th>
                <th className="p-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-t">
                  <td className="p-3">{enrollment.student_name}</td>
                  <td className="p-3">{enrollment.course_title}</td>
                  <td className="p-3">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                  <td className="p-3">{enrollment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}