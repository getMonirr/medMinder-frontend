import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // user info comes from the database
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (credentials?.email && credentials?.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
      if (account?.provider === "google") {
        const { data: existingUser } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user?.email}`
        );

        if (existingUser) {
          return existingUser;
        } else {
          const newUser = {
            name: user?.name,
            email: user?.email,
            password: user?.id,
          };

          const { data: result } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            newUser
          );

          if (result) {
            return result;
          }
        }
      }
    },
  },
};
