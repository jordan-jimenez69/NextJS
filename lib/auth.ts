import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const userRes = await pool.query(
          "SELECT id, email, password, role FROM utilisateur WHERE email = $1",
          [email]
        );
        if (userRes.rows.length === 0) return null;

        const user = userRes.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        if (userRes.rows.length === 0) {
          throw new Error("Email incorrect ou utilisateur non trouvé.");
        }
        if (!isValid) {
          throw new Error("Mot de passe incorrect.");
        }

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};