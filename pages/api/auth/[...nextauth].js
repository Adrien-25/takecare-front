import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// const adminEmails = ['adrien.schmidt7@gmail.com'];
// const adminRole = ['admin'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // Effectuez votre logique d'authentification
        // Recherchez l'utilisateur dans la base de données
        if (email !== "john@gmail.com" || password !== "1234") {
          throw new Error("Informations d'identification non valides");
        }
    
        // Si tout se passe bien
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "user",
        };
      },
    }),
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role == "admin") {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}

// export { handler as GET, handler as POST };
