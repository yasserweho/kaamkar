# Kaamkar

Job board for Pakistan, Asia, and the Gulf.

## Login (Gmail + X)

Auth uses [Auth.js](https://authjs.dev). Add these in Vercel → Project → Settings → Environment Variables, then redeploy:

```
AUTH_SECRET=           # openssl rand -base64 32
AUTH_URL=https://kaamkar.com
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_TWITTER_ID=
AUTH_TWITTER_SECRET=
```

### Google / Gmail

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → create OAuth client (Web application).
2. Authorized JavaScript origins: `https://kaamkar.com` and `http://localhost:3000`.
3. Authorized redirect URIs:
   - `https://kaamkar.com/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`
4. Paste Client ID / Secret into `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.

### X

1. [X Developer Portal](https://developer.x.com/en/portal/dashboard) → your app → User authentication.
2. App permissions: **Read**.
3. Type of app: **Web App**.
4. Callback URI:
   - `https://kaamkar.com/api/auth/callback/twitter`
   - `http://localhost:3000/api/auth/callback/twitter`
5. Website URL: `https://kaamkar.com`
6. Copy **OAuth 2.0 Client ID and Client Secret** into `AUTH_TWITTER_ID` and `AUTH_TWITTER_SECRET`.

X does not return an email. Google does.

## Run locally

```bash
npm install
cp .env.example .env.local
# fill keys
npm run dev
```
