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

function explain(error: unknown): string {
  const parts: string[] = [];
  const walk = (value: unknown, depth = 0) => {
    if (!value || depth > 5) return;
    if (typeof value === "string") {
      parts.push(value);
      return;
    }
    if (typeof value !== "object") {
      parts.push(String(value));
      return;
    }
    const record = value as Record<string, unknown>;
    if (typeof record.message === "string") parts.push(record.message);
    if (typeof record.error === "string") parts.push(record.error);
    if (typeof record.error_description === "string") parts.push(record.error_description);
    walk(record.err, depth + 1);
    walk(record.cause, depth + 1);
  };
  walk(error);
  return [...new Set(parts)].join(" | ").slice(0, 300);
}

const googleId = clean(env("AUTH_GOOGLE_ID"));
const googleSecret = clean(env("AUTH_GOOGLE_SECRET"));
const twitterId = clean(env("AUTH_TWITTER_ID"));
const twitterSecret = clean(env("AUTH_TWITTER_SECRET"));

export let lastAuthError = "";

const cookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: true,
  domain: ".kaamkar.com",
};

const providers: Provider[] = [
  Credentials({
    name: "Email",
    credentials: { email: { label: "Email", type: "email" } },
    authorize(credentials) {
      const email = String(credentials?.email || "").trim().toLowerCase();
      if (!email.includes("@") || email.length < 5) return null;
      return { id: email, email, name: email.split("@")[0] };
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
  pages: { signIn: "/account", error: "/account" },
  cookies: {
    pkceCodeVerifier: { name: "authjs.pkce.code_verifier", options: cookie },
    state: { name: "authjs.state", options: cookie },
    callbackUrl: { name: "authjs.callback-url", options: cookie },
    sessionToken: { name: "authjs.session-token", options: cookie },
  },
  logger: {
    error(error) {
      lastAuthError = explain(error);
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
