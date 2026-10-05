```ts
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

const providers: Provider[] = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
    },
    authorize(credentials) {
      const email = String(credentials?.email || "").trim().toLowerCase();

      if (!email.includes("@") || email.length < 5) {
        return null;
      }

      const name = email.split("@")[0];

      return {
        id: email,
        email,
        name,
      };
    },
  }),
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (process.env.AUTH_TWITTER_ID && process.env.AUTH_TWITTER_SECRET) {
  providers.push(
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,

  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "kaamkar-dev-secret-change-me",

  session: {
    strategy: "jwt",
  },

  providers,

  pages: {
    signIn: "/account",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }

      if (user?.name) {
        token.name = user.name;
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.name) {
          session.user.name = token.name;
        }
      }

      return session;
    },
  },
});
```
