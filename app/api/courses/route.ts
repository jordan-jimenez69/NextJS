import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { title, description, instrument, level, schedule, capacity } = await req.json();

    await pool.query(
      "INSERT INTO cours (title, description, instrument, teacher_id, level, schedule, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [title, description, instrument, session.user.id, level, schedule, capacity]
    );

    return NextResponse.json({ message: "Cours créé avec succès !" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const courses = await pool.query("SELECT * FROM cours");
    return NextResponse.json(courses.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { id, title, description } = await req.json();

    const existingCourse = await pool.query("SELECT * FROM cours WHERE id = $1", [id]);
    if (existingCourse.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    // Vérifie si l'utilisateur est bien le propriétaire du cours
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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Non autorisé." }, { status: 403 });
    }

    const { id } = await req.json();

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
