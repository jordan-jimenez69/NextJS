"use server";
import db from "@/lib/db";

export async function submitEvaluation(studentId: string, formData: FormData) {
  const courseId = formData.get("courseId")?.toString() || "";
  const evaluation = formData.get("evaluation")?.toString() || "";
  const comments = formData.get("comments")?.toString() || "";

  await db.query(
    "INSERT INTO progress (student_id, course_id, date, evaluation, comments) VALUES ($1, $2, NOW(), $3, $4)",
    [studentId, courseId, evaluation, comments]
  );
}
