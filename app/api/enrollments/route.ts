import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import pool from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { courseId } = await req.json();
    const studentId = session.user.id;

    // Vérifier si l'élève est déjà inscrit
    const existingEnrollment = await pool.query(
      `SELECT * FROM enrollments WHERE "student_Id" = $1 AND "course_Id" = $2`,
      [studentId, courseId]
    );

    if (existingEnrollment.rows.length > 0) {
      return NextResponse.json({ error: "Déjà inscrit." }, { status: 400 });
    }

    // Insérer l'inscription
    await pool.query(
      `INSERT INTO enrollments ("student_Id", "course_Id", "enrollmentDate", "status") 
       VALUES ($1::UUID, $2::UUID, NOW(), 'En attente')`,
      [studentId, courseId]
    );

    return NextResponse.json({ message: "Inscription réussie !" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// Récupérer les cours auxquels un élève est inscrit
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const studentId = session.user.id;
    const enrollments = await pool.query(
      `SELECT c.*, u.name AS teacher_name
       FROM enrollments e 
       JOIN cours c ON e."course_Id" = c.id 
       JOIN utilisateur u ON c."teacher_id" = u.id
       WHERE e."student_Id" = $1::UUID`,
      [studentId]
    );

    return NextResponse.json(enrollments.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// Se désinscrire d'un cours
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { courseId } = await req.json();
    const studentId = session.user.id;

    await pool.query(
      `DELETE FROM enrollments WHERE "student_Id" = $1 AND "course_Id" = $2`,
      [studentId, courseId]
    );

    return NextResponse.json({ message: "Désinscription réussie." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}