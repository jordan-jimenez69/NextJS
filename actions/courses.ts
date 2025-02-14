"use server";
import db from "@/lib/db";

export async function createCourse(formData: FormData) {
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";

  await db.query(
    "INSERT INTO courses (title, description) VALUES ($1, $2)",
    [title, description]
  );
}

export async function updateCourse(id: string, formData: FormData) {
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";

  await db.query(
    "UPDATE courses SET title = $1, description = $2 WHERE id = $3",
    [title, description, id]
  );
}

export async function deleteCourse(id: string) {
  await db.query("DELETE FROM courses WHERE id = $1", [id]);
}
