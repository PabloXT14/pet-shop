"use server"

import z from "zod"
import { revalidatePath } from "next/cache"

import { prisma } from "../lib/prisma"
import { calculatePeriod } from "../utils/calculate-period"

const createAppointmentSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor é obrigatório"),
  petName: z.string().min(3, "O nome do pet é obrigatório"),
  phone: z.string().min(15, "O telefone é obrigatório"),
  description: z.string().min(3, "A descrição é obrigatória"),
  scheduleAt: z.date("A data é obrigatória"),
})

type CreateAppointmentData = z.infer<typeof createAppointmentSchema>

export const createAppointmentAction = async (data: CreateAppointmentData) => {
  try {
    const parsedData = createAppointmentSchema.parse(data)

    const { scheduleAt } = parsedData

    const hour = scheduleAt.getHours()

    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour)

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error: "O Agendamento deve ser entre 9h-12h, 13h-18h ou 19h-21h",
      }
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt: parsedData.scheduleAt,
      },
    })

    if (existingAppointment) {
      return {
        error: "Já existe um agendamento para esse horário",
      }
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    })

    revalidatePath("/") // Revalida a página inicial para mostrar o novo agendamento
  } catch (error) {
    console.error("Error creating appointment:", error)

    return {
      error: "Erro ao criar agendamento. Tente novamente mais tarde.",
    }
  }
}
