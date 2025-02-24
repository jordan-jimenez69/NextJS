import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const course = await pool.query(
      `SELECT c.*, u.name AS teacher_name
       FROM cours c 
       LEFT JOIN utilisateur u ON c.teacher_id = u.id
       WHERE c.id = $1`,
      [id]
    );

    if (course.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    return NextResponse.json(course.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { title, description } = await req.json();
    const { id } = params;  // Récupère l'id du cours depuis les paramètres d'URL

    const existingCourse = await pool.query("SELECT * FROM cours WHERE id = $1", [id]);
    if (existingCourse.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    if (existingCourse.rows[0].teacher_id !== session.user.id) {
      return NextResponse.json({ error: "Accès interdit." }, { status: 403 });
    }

    await pool.query(
      "UPDATE cours SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );

    return NextResponse.json({ message: "Cours mis à jour avec succès !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { id } = params; // Récupérer l'ID depuis l'URL

    const existingCourse = await pool.query("SELECT * FROM cours WHERE id = $1", [id]);
    if (existingCourse.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    if (existingCourse.rows[0].teacher_id !== session.user.id) {
      return NextResponse.json({ error: "Accès interdit." }, { status: 403 });
    }

    await pool.query("DELETE FROM cours WHERE id = $1", [id]);

    return NextResponse.json({ message: "Cours supprimé avec succès !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

