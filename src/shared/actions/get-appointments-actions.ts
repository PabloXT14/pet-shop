"use server"

import dayjs from "dayjs"

import { prisma } from "../lib/prisma"
import { APP_TIMEZONE } from "../lib/dayjs"

type GetAppointmentsParams = {
  date: Date
}

export const getAppointmentsAction = async ({
  date,
}: GetAppointmentsParams) => {
  const day = dayjs(date)

  const start = day.startOf("day").toDate()
  const end = day.endOf("day").toDate()

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: start, // start of the day
        lte: end, // end of the day
      },
    },
    orderBy: {
      scheduleAt: "asc",
    },
  })

  return {
    appointments: appointments.map((appointment) => ({
      ...appointment,
      scheduleAt: dayjs(appointment.scheduleAt).tz(APP_TIMEZONE).toDate(), // Converte para Date antes de enviar para o cliente
    })),
  }
}
