"use server";
import db from "@/lib/db";

export async function enrollStudent(courseId: string, studentId: string) {
  await db.query(
    "INSERT INTO enrollments (course_id, student_id, enrollment_date) VALUES ($1, $2, NOW())",
    [courseId, studentId]
  );
}

export async function updateEnrollmentStatus(id: string, status: string) {
  await db.query(
    "UPDATE enrollments SET status = $1 WHERE id = $2",
    [status, id]
  );
}
