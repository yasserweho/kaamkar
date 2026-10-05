import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

function env(name: string) {
  return process.env[name] || "";
}

function clean(value?: string) {
  return (value || "").replace(/\s+/g, "");
}

const googleId = clean(env("AUTH_GOOGLE_ID"));
const googleSecret = clean(env("AUTH_GOOGLE_SECRET"));
const twitterId = clean(env("AUTH_TWITTER_ID"));
const twitterSecret = clean(env("AUTH_TWITTER_SECRET"));

export let lastAuthError = "";

const providers: Provider[] = [
  Credentials({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email" },
    },
    authorize(credentials) {
      const email = String(credentials?.email || "").trim().toLowerCase();
      if (!email.includes("@") || email.length < 5) return null;
      const name = email.split("@")[0];
      return { id: email, email, name };
    },
  }),
];

if (googleId && googleSecret) {
  providers.push(Google({ clientId: googleId, clientSecret: googleSecret }));
}

if (twitterId && twitterSecret) {
  providers.push(Twitter({ clientId: twitterId, clientSecret: twitterSecret }));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  providers,
  pages: {
    signIn: "/account",
    error: "/account",
  },
  logger: {
    error(error) {
      const cause = error.cause instanceof Error ? error.cause.message : String(error.cause || "");
      lastAuthError = [error.name, error.message, cause].filter(Boolean).join(" | ").slice(0, 240);
      console.error("[auth]", lastAuthError);
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      if (user?.name) token.name = user.name;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
        if (token.email) session.user.email = token.email;
        if (token.name) session.user.name = token.name;
      }
      return session;
    },
  },
});
