import { type NextApiRequest, type NextApiResponse } from "next";

import admin from "~/utils/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const message = {
    notification: {
      title: "free t-shirt",
      body: "just kidding only 5% of the most expensive t-shirt",
    },
    data: {
      url: "/offers",
    },
    token:
      "fBDNeHbBXrD3UmbQxn3PMh:APA91bEniE9odzuGIRMnMQAmv_gpS6WHZlYL5a22lDBS47yFxHR3EpOSbqo6R2iT1L38DOwt0kC6a4bGHLAH1mP3cD61KS3IKe_XHTQE3lM69VAcizAE0XBPMANxHboJm6xQfp6QfmgI",
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(500).json({ success: false, error });
  }
}
