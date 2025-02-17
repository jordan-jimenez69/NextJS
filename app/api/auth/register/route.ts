import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const existingUser = await pool.query("SELECT * FROM utilisateur WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "Cet utilisateur existe déjà." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO utilisateur (name, email, password, role, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [name, email, hashedPassword, role]
    );

    return NextResponse.json({ message: "Inscription réussie !" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}