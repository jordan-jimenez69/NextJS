import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    // Récupérer les inscriptions pour les cours du professeur
    const enrollments = await pool.query(
      `SELECT e.id, e."enrollmentDate", e.status, s.name AS student_name, c.title AS course_title
       FROM enrollments e
       JOIN cours c ON e."course_Id" = c.id
       JOIN utilisateur s ON e."student_Id" = s.id
       WHERE c."teacher_id" = $1`,
      [session.user.id]
    );

    return NextResponse.json(enrollments.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
