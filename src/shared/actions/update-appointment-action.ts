"use server"

import z from "zod"
import { revalidatePath } from "next/cache"

import { prisma } from "../lib/prisma"

const updateAppointmentSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor é obrigatório"),
  petName: z.string().min(3, "O nome do pet é obrigatório"),
  phone: z.string().min(15, "O telefone é obrigatório"),
  description: z.string().min(3, "A descrição é obrigatória"),
  scheduleAt: z.date("A data é obrigatória"),
})

type UpdateAppointmentActionParams = {
  id: string
  data: z.infer<typeof updateAppointmentSchema>
}

export const updateAppointmentAction = async (
  params: UpdateAppointmentActionParams,
) => {
  try {
    const { id, data } = params

    const parsedData = updateAppointmentSchema.parse(data)

    const { scheduleAt } = parsedData

    const hour = scheduleAt.getHours()

    const isMorning = hour >= 9 && hour < 12
    const isAfternoon = hour >= 13 && hour < 18
    const isEvening = hour >= 19 && hour < 21

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error: "O Agendamento deve ser entre 9h-12h, 13h-18h ou 19h-21h",
      }
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt: parsedData.scheduleAt,
        id: {
          not: id,
        },
      },
    })

    if (existingAppointment) {
      return {
        error: "Já existe um agendamento para esse horário",
      }
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    })

    revalidatePath("/")
  } catch (error) {
    console.error("Error updating appointment:", error)
  }
}
