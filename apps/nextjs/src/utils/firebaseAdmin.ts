import admin from "firebase-admin";

import { env } from "~/env.mjs";

if (!admin?.apps?.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: env.FIREBASE_PRIVATE_KEY,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export default admin;
