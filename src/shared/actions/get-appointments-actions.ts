"use server"

import dayjs from "dayjs"
import { prisma } from "../lib/prisma"

type GetAppointmentsParams = {
  date: Date
}

export const getAppointmentsAction = async ({
  date,
}: GetAppointmentsParams) => {
  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: dayjs(date).startOf("day").toDate(), // start of the day
        lte: dayjs(date).endOf("day").toDate(), // end of the day
      },
    },
    orderBy: {
      scheduleAt: "asc",
    },
  })

  return { appointments }
}
