import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      type: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await mongooseConnect();

          const user = await User.findOne({
            email: credentials && credentials.email,
          }).select("+password");

          if (!user) {
            throw new Error("Les informations d'identification sont invalides");
          }

          const isPasswordCorrect = await compare(
            (credentials && credentials.password) || "",
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Mot de passe incorrecte");
          }

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Une erreur s'est produite: ", error);
          throw new Error("Authentification échouée");
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
  // session: {
  //   jwt: true,
  // },
  callbacks: {
    session: ({ session, token, user }) => {
      session.user.address = {
        city: user.city || "",
        postalCode: user.postalCode || "",
        streetAddress: user.streetAddress || "",
        country: user.country || "",
      };
      return session;
    },

    // async session(session, user) {
    //   session.user.address = {
    //     city: userWithAddress.city || "",
    //     postalCode: userWithAddress.postalCode || "",
    //     streetAddress: userWithAddress.streetAddress || "",
    //     country: userWithAddress.country || "",
    //   };

    //   return session;
    // },
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
