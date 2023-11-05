import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // name: { label: "Text", type: "name" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("/api/register", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()


        await mongooseConnect();
        const { email, password } = credentials;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error("Informations d'identification non valides");
        } else {
        }

        // const passwordHash = await hash(password, 10);

        // const newUser = new User({
        //   email,
        //   passwordHash,
        // });

        // await newUser.save();


        if (res.ok && user) {
          return user; //<---- is this actually returning the full user object to the session?
        } else {
          return null;
        }

        
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
          city: profile.city ?? "",
          postalCode: profile.postalCode ?? "",
          streetAddress: profile.streetAddress ?? "",
          country: profile.country ?? "",
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
          city: profile.city ?? "",
          postalCode: profile.postalCode ?? "",
          streetAddress: profile.streetAddress ?? "",
          country: profile.country ?? "",
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  callbacks: {
    session: ({ session, token, user }) => {
      return session;
    },
  },
  pages: {
    signIn: "/account/login",
    signUp: "/account/register",
    signOut: "/account/signout",
    error: "/account/error", // Error code passed in query string as ?error=
    verifyRequest: "/account/verify-request", // (used for check email message)
    newUser: "/my-account", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);

// export async function isAdminRequest(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (session?.user?.role == "admin") {
//     res.status(401);
//     res.end();
//     throw "not an admin";
//   }
// }

// export { handler as GET, handler as POST };
