"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentCourses() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<
    { id: string; title: string; description: string; instrument: string; level: string; schedule: string; capacity: number; teacher_name: string; }[]
  >([]);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchEnrollments() {
      if (session?.user) {
        const res = await fetch("/api/enrollments");
        const data = await res.json();
        setEnrolledCourses(new Set(data.map((c: { id: any }) => c.id)));
      }
    }
    fetchEnrollments();
  }, [session]);

  async function handleEnroll(courseId: string) {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    if (res.ok) {
      setEnrolledCourses((prev) => new Set(prev).add(courseId));
    }
  }

  return (
    <div className=" mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des cours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ul className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <li key={course.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p><strong>Instrument :</strong> {course.instrument}</p>
              <p><strong>Niveau :</strong> {course.level}</p>
              <p><strong>Horaire :</strong> {course.schedule}</p>
              <p><strong>Nombre de participants :</strong> {course.capacity}</p>
              <p><strong>Professeur :</strong> {course.teacher_name}</p>
              {enrolledCourses.has(course.id) ? (
                <span className="text-green-600">✅ Inscrit</span>
              ) : (
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  S'inscrire
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
