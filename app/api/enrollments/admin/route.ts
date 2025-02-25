import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const enrollments = await pool.query(
      `SELECT e.id, u.name AS student_name, t.name AS teacher_name, e.status
       FROM enrollments e
       JOIN utilisateur u ON e."student_Id" = u.id
       JOIN cours c ON e."course_Id" = c.id
       JOIN utilisateur t ON c."teacher_id" = t.id`
    );

    return NextResponse.json(enrollments.rows);
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    await pool.query(`UPDATE enrollments SET status = $1 WHERE id = $2`, [
      status,
      id,
    ]);

    return NextResponse.json({ message: "Statut mis à jour." }, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
