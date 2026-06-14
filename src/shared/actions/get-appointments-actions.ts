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
  const dayInTimezone = dayjs(date).tz(APP_TIMEZONE)

  const start = dayInTimezone.startOf("day").utc().toDate() // 00:00 BRT → UTC
  const end = dayInTimezone.endOf("day").utc().toDate()

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
