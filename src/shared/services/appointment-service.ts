"use server"

import { prisma } from "../lib/prisma"

export const getAppointmentsService = async () => {
  const appointments = await prisma.appointment.findMany()

  return { appointments }
}
