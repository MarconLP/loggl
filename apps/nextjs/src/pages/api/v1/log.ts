import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { prisma } from "@acme/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      error: { message: `Method ${req.method} Not Allowed` },
    });
  }

  const [, token] = req.headers['authorization'].split(' ');

  if (!token) {
    return false;
  }

  const userId = token

  const schema = z.object({
    project: z.string(),
    channel: z.string(),
    event: z.string(),
    description: z.string(),
    icon: z.string(),
    notify: z.boolean(),
  });

  const response = schema.safeParse(req.body);

  // If the request body is invalid, return a 400 error with the validation errors
  if (!response.success) {
    const { errors } = response.error;

    return res.status(400).json({
      error: { message: "Invalid request", errors },
    });
  }

  const {
    project,
    channel,
    event,
    description,
    icon,
    notify,
  } = response.data;

  const projectDoc = await prisma.project.findMany({
    where: {
      userId,
      name: project,
    },
  });

  if (!projectDoc[0])
    return res.status(400).json({
      error: "That project does not exist",
    });

  let channelDoc = await prisma.channel.findMany({
    where: {
      projectId: projectDoc[0].id,
      name: channel,
    },
  });
  if (!channelDoc[0]) {
    channelDoc = [
      await prisma.channel.create({
        data: {
          projectId: projectDoc[0].id,
          name: channel,
        },
      }),
    ];
  }

  if (!channelDoc[0])
    return res.status(400).json({
      error: "Something went wrong",
    });

  const notification = await prisma.notification.create({
    data: {
      event,
      description,
      icon,
      projectId: projectDoc[0].id,
      channelId: channelDoc[0].id,
      userId,
    },
  });

  if (notify) {
    console.log('send push notification to user')
  }

  console.log(notification);

  res.send("event successfully created");
}