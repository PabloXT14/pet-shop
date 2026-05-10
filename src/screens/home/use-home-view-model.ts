import { APPOINTMENTS } from "@/shared/data/appointments"
import { prisma } from "@/shared/lib/prisma"
import { AppointmentService } from "@/shared/services/appointment-service"

export const useHomeViewModel = () => {
  const fetchAppointments = async () => {
    const appointments = await prisma.appointment.findMany()

    console.log(appointments)
  }

  fetchAppointments()

  return {
    groupedAppointments:
      AppointmentService.groupAppointmentsByPeriod(APPOINTMENTS),
  }
}
