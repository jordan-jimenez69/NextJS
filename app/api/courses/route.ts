import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import pool from "@/lib/db";
import { authOptions } from "@/lib/auth";

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
    const courses = await pool.query(
      `SELECT c.*, u.name AS teacher_name
       FROM cours c 
       LEFT JOIN utilisateur u ON c."teacher_id" = u.id`
    );
    return NextResponse.json(courses.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  } 
}