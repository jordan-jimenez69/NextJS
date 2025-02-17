import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { title, description, instrument, teacherId, level, schedule, capacity } = await req.json();
    
        // Vérifier que teacherId est bien un entier
        if (isNaN(Number(teacherId))) {
          return NextResponse.json({ error: "L'ID de l'enseignant doit être un entier valide." }, { status: 400 });
        }
    
        // Insérer le cours dans la base de données
        await pool.query(
          "INSERT INTO courses (title, description, instrument, teacher_id, level, schedule, capacity) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [title, description, instrument, Number(teacherId), level, schedule, capacity]
        );
    
        return NextResponse.json({ message: "Cours créé avec succès !" }, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
      }
    }


// Lire les cours
export async function GET(req: NextRequest) {
  try {
    const courses = await pool.query("SELECT * FROM courses");
    return NextResponse.json(courses.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// Modifier un cours
export async function PUT(req: NextRequest) {
  try {
    const { id, title, description } = await req.json();

    if (!id || !title || !description) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const existingCourse = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (existingCourse.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    await pool.query(
      "UPDATE courses SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );

    return NextResponse.json({ message: "Cours mis à jour avec succès !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// Supprimer un cours
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "L'ID du cours est requis." }, { status: 400 });
    }

    const existingCourse = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (existingCourse.rows.length === 0) {
      return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
    }

    await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    return NextResponse.json({ message: "Cours supprimé avec succès !" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
