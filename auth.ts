import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

function clean(value?: string) {
  return (value || "").replace(/\s+/g, "");
}

const googleId = clean(process.env.AUTH_GOOGLE_ID);
const googleSecret = clean(process.env.AUTH_GOOGLE_SECRET);
const twitterId = clean(process.env.AUTH_TWITTER_ID);
const twitterSecret = clean(process.env.AUTH_TWITTER_SECRET);
const secret = clean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET) || "kaamkar-dev-secret-change-me";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: true,
  domain: ".kaamkar.com",
};

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
  providers.push(
    Google({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  );
}

if (twitterId && twitterSecret) {
  providers.push(
    Twitter({
      clientId: twitterId,
      clientSecret: twitterSecret,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret,
  session: { strategy: "jwt" },
  providers,
  pages: { signIn: "/account" },
  cookies: {
    sessionToken: { name: "authjs.session-token", options: cookieOptions },
    callbackUrl: { name: "authjs.callback-url", options: cookieOptions },
    csrfToken: { name: "authjs.csrf-token", options: { ...cookieOptions, httpOnly: false } },
    pkceCodeVerifier: { name: "authjs.pkce.code_verifier", options: cookieOptions },
    state: { name: "authjs.state", options: cookieOptions },
  },
  logger: {
    error(error) {
      console.error("[auth]", error);
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
