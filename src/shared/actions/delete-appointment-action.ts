"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "../lib/prisma"

export const deleteAppointmentAction = async (appointmentId: string) => {
  try {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    })

    revalidatePath("/")

    return { success: "Agendamento excluído com sucesso" }
  } catch (error) {
    console.error("Error deleting appointment:", error)

    return {
      error: "Erro ao excluir agendamento. Tente novamente mais tarde.",
    }
  }
}
