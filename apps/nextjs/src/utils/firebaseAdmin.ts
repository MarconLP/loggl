import admin, { type ServiceAccount } from "firebase-admin";

import { env } from "~/env.mjs";

if (!admin?.apps?.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "loggl-bcf98",
      privateKey: env.FIREBASE_PRIVATE_KEY,
      clientEmail:
        "firebase-adminsdk-jc9tc@loggl-bcf98.iam.gserviceaccount.com",
    }),
  });
}

export default admin;
